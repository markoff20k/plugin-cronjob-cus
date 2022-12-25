import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { rewards, rewardsId } from './rewards';

export interface historyAttributes {
  id: number;
  member_id: number;
  stake_id: number;
  reward_id: number;
  amount: number;
  lockup_date: Date;
  release_date: Date;
  status: number;
}

export type historyPk = "id";
export type historyId = history[historyPk];
export type historyOptionalAttributes = "id" | "status";
export type historyCreationAttributes = Optional<historyAttributes, historyOptionalAttributes>;

export class history extends Model<historyAttributes, historyCreationAttributes> implements historyAttributes {
  id!: number;
  member_id!: number;
  stake_id!: number;
  reward_id!: number;
  amount!: number;
  lockup_date!: Date;
  release_date!: Date;
  status!: number;

  // history belongsTo rewards via reward_id
  reward!: rewards;
  getReward!: Sequelize.BelongsToGetAssociationMixin<rewards>;
  setReward!: Sequelize.BelongsToSetAssociationMixin<rewards, rewardsId>;
  createReward!: Sequelize.BelongsToCreateAssociationMixin<rewards>;

  static initModel(sequelize: Sequelize.Sequelize): typeof history {
    history.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    member_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    stake_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reward_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'rewards',
        key: 'reward_id'
      }
    },
    amount: {
      type: DataTypes.DECIMAL(32,16),
      allowNull: false
    },
    lockup_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    release_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'history',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "fk_reward_id_idx",
        using: "BTREE",
        fields: [
          { name: "reward_id" },
        ]
      },
    ]
  });
  return history;
  }
}
