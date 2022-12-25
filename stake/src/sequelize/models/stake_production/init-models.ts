import { Sequelize } from 'sequelize';
import { RewardModel } from './rewards';
import { StakeModel } from './stakes';
import { StakeHistoryModel } from './history';
import { StakeAccountsModel } from './accounts';
import { UnstakeHistoryModel } from './unstake';
import { RanksModel } from './ranks';

export * from './rewards';
export * from './stakes';
export * from './accounts';
export * from './history';
export * from './ranks';

export function initModels(sequelize: Sequelize) {
  StakeModel.initModel(sequelize);
  RewardModel.initModel(sequelize);
  StakeHistoryModel.initModel(sequelize);
  StakeAccountsModel.initModel(sequelize);
  UnstakeHistoryModel.initModel(sequelize);
  RanksModel.initModel(sequelize);

  StakeModel.hasMany(RewardModel, {
    foreignKey: 'stake_id',
    as: 'rewards',
  });
  RewardModel.belongsTo(StakeModel, { foreignKey: 'stake_id', as: 'stake' });
  StakeHistoryModel.belongsTo(RewardModel, {
    foreignKey: 'reward_id',
    as: 'reward',
  });
  StakeHistoryModel.belongsTo(StakeModel, {
    foreignKey: 'stake_id',
    as: 'stake',
  });

  return {
    stakes: StakeModel,
    rewards: RewardModel,
    history: StakeHistoryModel,
    accounts: StakeAccountsModel,
    unstake: UnstakeHistoryModel,
    ranks: RanksModel,
  };
}
