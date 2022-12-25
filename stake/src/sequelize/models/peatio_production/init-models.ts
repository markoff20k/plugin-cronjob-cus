import type { Sequelize } from 'sequelize';
import type {
  accountsAttributes,
  accountsCreationAttributes,
} from './accounts';
import { accounts } from './accounts';
import type { membersAttributes, membersCreationAttributes } from './members';
import { members } from './members';

export { accounts, members };
export type {
  accountsAttributes,
  accountsCreationAttributes,
  membersAttributes,
  membersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  accounts.initModel(sequelize);
  members.initModel(sequelize);

  return {
    accounts: accounts,
    members: members,
  };
}
