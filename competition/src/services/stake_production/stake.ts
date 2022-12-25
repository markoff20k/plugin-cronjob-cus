import { stakes } from './../../sequelize/models/stake_production/stakes';
export const getStakesByCurrencyID = async (currencyID: string) => {
  const stakeList = await stakes.findAll({
    where: {
      currency_id: currencyID,
    },
  });
  return stakeList;
};

// props => 1 object
