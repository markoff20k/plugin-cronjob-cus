import type { Sequelize, Model } from "sequelize";
import { accounts } from "./accounts";
import type { accountsAttributes, accountsCreationAttributes } from "./accounts";
import { deposits } from "./deposits";
import type { depositsAttributes, depositsCreationAttributes } from "./deposits";
import { members } from "./members";
import type { membersAttributes, membersCreationAttributes } from "./members";
import { trades } from "./trades";
import type { tradesAttributes, tradesCreationAttributes } from "./trades";

export {
  accounts,
  deposits,
  members,
  trades,
};

export type {
  accountsAttributes,
  accountsCreationAttributes,
  depositsAttributes,
  depositsCreationAttributes,
  membersAttributes,
  membersCreationAttributes,
  tradesAttributes,
  tradesCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  accounts.initModel(sequelize);
  deposits.initModel(sequelize);
  members.initModel(sequelize);
  trades.initModel(sequelize);


  return {
    accounts: accounts,
    deposits: deposits,
    members: members,
    trades: trades,
  };
}
