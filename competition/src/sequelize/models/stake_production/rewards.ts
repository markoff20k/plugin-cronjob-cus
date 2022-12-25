import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { history, historyId } from './history';
import type { stakes, stakesId } from './stakes';

export interface rewardsAttributes {
  reward_id: number;
  stake_id: number;
  period: number;
  annual_rate: number;
}

export type rewardsPk = "reward_id";
export type rewardsId = rewards[rewardsPk];
export type rewardsOptionalAttributes = "reward_id";
export type rewardsCreationAttributes = Optional<rewardsAttributes, rewardsOptionalAttributes>;

export class rewards extends Model<rewardsAttributes, rewardsCreationAttributes> implements rewardsAttributes {
  reward_id!: number;
  stake_id!: number;
  period!: number;
  annual_rate!: number;

  // rewards hasMany history via reward_id
  histories!: history[];
  getHistories!: Sequelize.HasManyGetAssociationsMixin<history>;
  setHistories!: Sequelize.HasManySetAssociationsMixin<history, historyId>;
  addHistory!: Sequelize.HasManyAddAssociationMixin<history, historyId>;
  addHistories!: Sequelize.HasManyAddAssociationsMixin<history, historyId>;
  createHistory!: Sequelize.HasManyCreateAssociationMixin<history>;
  removeHistory!: Sequelize.HasManyRemoveAssociationMixin<history, historyId>;
  removeHistories!: Sequelize.HasManyRemoveAssociationsMixin<history, historyId>;
  hasHistory!: Sequelize.HasManyHasAssociationMixin<history, historyId>;
  hasHistories!: Sequelize.HasManyHasAssociationsMixin<history, historyId>;
  countHistories!: Sequelize.HasManyCountAssociationsMixin;
  // rewards belongsTo stakes via stake_id
  stake!: stakes;
  getStake!: Sequelize.BelongsToGetAssociationMixin<stakes>;
  setStake!: Sequelize.BelongsToSetAssociationMixin<stakes, stakesId>;
  createStake!: Sequelize.BelongsToCreateAssociationMixin<stakes>;

  static initModel(sequelize: Sequelize.Sequelize): typeof rewards {
    rewards.init({
    reward_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    stake_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'stakes',
        key: 'stake_id'
      }
    },
    period: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    annual_rate: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'rewards',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "reward_id" },
        ]
      },
      {
        name: "fk_stake_id_idx",
        using: "BTREE",
        fields: [
          { name: "stake_id" },
        ]
      },
    ]
  });
  return rewards;
  }
}
