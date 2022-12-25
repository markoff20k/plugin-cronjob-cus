import { toNumber } from 'lodash';
import moment from 'moment';
import NP from 'number-precision';
import { stakeModel } from '../sequelize';
NP.enableBoundaryChecking(false); // default param is true

const listHistories = async () => {
  const histories = await stakeModel.history.findAll({
    where: {
      status: 0,
    },
    include: [
      {
        model: stakeModel.rewards,
        as: 'reward',
        attributes: ['reward_id', 'period', 'annual_rate'],
      },
      {
        model: stakeModel.stakes,
        as: 'stake',
        attributes: ['currency_id'],
      },
    ],
  });
  const validHistories = histories.filter(
    (h) => new Date() > new Date(h.release_date)
  );
  return validHistories;
};

export const run = async () => {
  const histories = await listHistories();
  for (let index = 0; index < histories.length; index++) {
    const history = histories[index];
    const { id, member_id, amount, reward, stake } = history;
    const { period, annual_rate } = reward;
    const { currency_id } = stake;

    const rate = NP.divide(toNumber(annual_rate), 365);
    const benefits = NP.times(rate, toNumber(period), toNumber(amount));
    const total = NP.plus(toNumber(amount), toNumber(benefits));
    const { balance } = (await stakeModel.accounts.findOne({
      where: {
        member_id: member_id,
        currency_id: currency_id,
      },
    })) || { balance: null };
    if (!balance) {
      await stakeModel.accounts.create({
        member_id: member_id,
        currency_id: currency_id,
        balance: 0,
        locked: 0,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    await stakeModel.accounts.increment(
      {
        balance: +total,
      },
      {
        where: {
          member_id: member_id,
          currency_id: currency_id,
        },
      }
    );

    await stakeModel.accounts.update(
      { updated_at: new Date() },
      { where: { member_id: member_id, currency_id: currency_id } }
    );
    await stakeModel.history.update({ status: 1 }, { where: { id: id } });
    console.warn(
      `Release member_id: ${member_id}, historyID: ${id} , total: ${total}, currency: ${currency_id}`
    );
  }
  console.info(
    `🚀 [Stake Release Cronjob ${moment(new Date()).format(
      'DD/MM/YYYY HH:mm:ss'
    )}]`
  );
};