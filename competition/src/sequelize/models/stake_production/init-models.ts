import type { Sequelize, Model } from "sequelize";
import { accounts } from "./accounts";
import type { accountsAttributes, accountsCreationAttributes } from "./accounts";
import { history } from "./history";
import type { historyAttributes, historyCreationAttributes } from "./history";
import { ranks } from "./ranks";
import type { ranksAttributes, ranksCreationAttributes } from "./ranks";
import { rewards } from "./rewards";
import type { rewardsAttributes, rewardsCreationAttributes } from "./rewards";
import { stakes } from "./stakes";
import type { stakesAttributes, stakesCreationAttributes } from "./stakes";
import { unstake } from "./unstake";
import type { unstakeAttributes, unstakeCreationAttributes } from "./unstake";

export {
  accounts,
  history,
  ranks,
  rewards,
  stakes,
  unstake,
};

export type {
  accountsAttributes,
  accountsCreationAttributes,
  historyAttributes,
  historyCreationAttributes,
  ranksAttributes,
  ranksCreationAttributes,
  rewardsAttributes,
  rewardsCreationAttributes,
  stakesAttributes,
  stakesCreationAttributes,
  unstakeAttributes,
  unstakeCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  accounts.initModel(sequelize);
  history.initModel(sequelize);
  ranks.initModel(sequelize);
  rewards.initModel(sequelize);
  stakes.initModel(sequelize);
  unstake.initModel(sequelize);

  history.belongsTo(rewards, { as: "reward", foreignKey: "reward_id"});
  rewards.hasMany(history, { as: "histories", foreignKey: "reward_id"});
  rewards.belongsTo(stakes, { as: "stake", foreignKey: "stake_id"});
  stakes.hasMany(rewards, { as: "rewards", foreignKey: "stake_id"});

  return {
    accounts: accounts,
    history: history,
    ranks: ranks,
    rewards: rewards,
    stakes: stakes,
    unstake: unstake,
  };
}
