import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface withdraw_limitsAttributes {
  id: number;
  group: string;
  kyc_level: string;
  limit_24_hour: number;
  limit_1_month: number;
  created_at: Date;
  updated_at: Date;
}

export type withdraw_limitsPk = "id";
export type withdraw_limitsId = withdraw_limits[withdraw_limitsPk];
export type withdraw_limitsOptionalAttributes = "id" | "group" | "kyc_level" | "limit_24_hour" | "limit_1_month";
export type withdraw_limitsCreationAttributes = Optional<withdraw_limitsAttributes, withdraw_limitsOptionalAttributes>;

export class withdraw_limits extends Model<withdraw_limitsAttributes, withdraw_limitsCreationAttributes> implements withdraw_limitsAttributes {
  id!: number;
  group!: string;
  kyc_level!: string;
  limit_24_hour!: number;
  limit_1_month!: number;
  created_at!: Date;
  updated_at!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof withdraw_limits {
    withdraw_limits.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    group: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: "any"
    },
    kyc_level: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: "any"
    },
    limit_24_hour: {
      type: DataTypes.DECIMAL(32,16),
      allowNull: false,
      defaultValue: 0.0000000000000000
    },
    limit_1_month: {
      type: DataTypes.DECIMAL(32,16),
      allowNull: false,
      defaultValue: 0.0000000000000000
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'withdraw_limits',
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
        name: "index_withdraw_limits_on_group_and_kyc_level",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "group" },
          { name: "kyc_level" },
        ]
      },
      {
        name: "index_withdraw_limits_on_group",
        using: "BTREE",
        fields: [
          { name: "group" },
        ]
      },
      {
        name: "index_withdraw_limits_on_kyc_level",
        using: "BTREE",
        fields: [
          { name: "kyc_level" },
        ]
      },
    ]
  });
  return withdraw_limits;
  }
}
