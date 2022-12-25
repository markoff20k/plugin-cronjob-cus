import { toLower, toNumber } from "lodash";
import moment from "moment";
import { Op } from "sequelize";
import { holderModel, peatioModel } from "../sequelize";
import { rounds } from "../sequelize/models/holder_production";
import Big from "big.js";
const DEFAULT_CURRENCY = "cx";

export const scanHoldings = async () => {
  try {
    const validHolders = await holderModel.holders.findAll({
      where: { status: 1 },
    });

    const runningRound = await holderModel.rounds.findOne({
      where: {
        start_time: {
          [Op.lte]: moment().toDate(),
        },
        end_time: {
          [Op.gte]: moment().toDate(),
        },
      },
    });

    if (!runningRound) return;
    const { id: roundID, start_time } = runningRound.toJSON() as rounds;

    const currentDay =
      (new Date().getTime() - new Date(start_time).getTime()) /
      (1000 * 3600 * 24);

    if (currentDay < 2) return;
    for await (const holder of validHolders) {
      const { id: holderID, member_id } = holder;
      const { amount: oldAmount } = (await holderModel.holdings.findOne({
        where: { round_id: roundID, holder_id: holderID, day: currentDay - 1 },
      })) || { amount: undefined };
      const { balance: currentAmount } = (await peatioModel.accounts.findOne({
        where: { member_id: member_id, currency_id: toLower(DEFAULT_CURRENCY) },
      })) || { balance: undefined };
      if (toNumber(currentAmount) < toNumber(oldAmount)) {
        await holderModel.holders.update(
          { status: 3 },
          { where: { id: holderID } }
        );
      } else {
        const newAmount = new Big(toNumber(oldAmount))
          .plus(toNumber(currentAmount))
          .div(currentDay);
        await holderModel.holdings.create({
          holder_id: holderID,
          round_id: roundID,
          amount: newAmount.toNumber(),
          day: currentDay,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
