import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { rewards, rewardsId } from './rewards';

export interface stakesAttributes {
  stake_id: number;
  staking_name: string;
  description?: string;
  currency_id: string;
  start_time: Date;
  end_time: Date;
  active: number;
  ref_link?: string;
  total_amount: number;
  cap_amount: number;
  min_amount: number;
  cap_amount_per_user?: number;
}

export type stakesPk = "stake_id";
export type stakesId = stakes[stakesPk];
export type stakesOptionalAttributes = "stake_id" | "description" | "ref_link" | "total_amount" | "cap_amount" | "min_amount" | "cap_amount_per_user";
export type stakesCreationAttributes = Optional<stakesAttributes, stakesOptionalAttributes>;

export class stakes extends Model<stakesAttributes, stakesCreationAttributes> implements stakesAttributes {
  stake_id!: number;
  staking_name!: string;
  description?: string;
  currency_id!: string;
  start_time!: Date;
  end_time!: Date;
  active!: number;
  ref_link?: string;
  total_amount!: number;
  cap_amount!: number;
  min_amount!: number;
  cap_amount_per_user?: number;

  // stakes hasMany rewards via stake_id
  rewards!: rewards[];
  getRewards!: Sequelize.HasManyGetAssociationsMixin<rewards>;
  setRewards!: Sequelize.HasManySetAssociationsMixin<rewards, rewardsId>;
  addReward!: Sequelize.HasManyAddAssociationMixin<rewards, rewardsId>;
  addRewards!: Sequelize.HasManyAddAssociationsMixin<rewards, rewardsId>;
  createReward!: Sequelize.HasManyCreateAssociationMixin<rewards>;
  removeReward!: Sequelize.HasManyRemoveAssociationMixin<rewards, rewardsId>;
  removeRewards!: Sequelize.HasManyRemoveAssociationsMixin<rewards, rewardsId>;
  hasReward!: Sequelize.HasManyHasAssociationMixin<rewards, rewardsId>;
  hasRewards!: Sequelize.HasManyHasAssociationsMixin<rewards, rewardsId>;
  countRewards!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof stakes {
    stakes.init({
    stake_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    staking_name: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    currency_id: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    active: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ref_link: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    total_amount: {
      type: DataTypes.DECIMAL(32,16),
      allowNull: false,
      defaultValue: 0.0000000000000000
    },
    cap_amount: {
      type: DataTypes.DECIMAL(32,16),
      allowNull: false,
      defaultValue: 0.0000000000000000
    },
    min_amount: {
      type: DataTypes.DECIMAL(32,16),
      allowNull: false,
      defaultValue: 0.0000000000000000
    },
    cap_amount_per_user: {
      type: DataTypes.DECIMAL(32,16),
      allowNull: true,
      defaultValue: 0.0000000000000000
    }
  }, {
    sequelize,
    tableName: 'stakes',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "stake_id" },
        ]
      },
    ]
  });
  return stakes;
  }
}
