import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface trading_feesAttributes {
  id: number;
  market_id: string;
  group: string;
  maker: number;
  taker: number;
  created_at: Date;
  updated_at: Date;
}

export type trading_feesPk = "id";
export type trading_feesId = trading_fees[trading_feesPk];
export type trading_feesOptionalAttributes = "id" | "market_id" | "group" | "maker" | "taker";
export type trading_feesCreationAttributes = Optional<trading_feesAttributes, trading_feesOptionalAttributes>;

export class trading_fees extends Model<trading_feesAttributes, trading_feesCreationAttributes> implements trading_feesAttributes {
  id!: number;
  market_id!: string;
  group!: string;
  maker!: number;
  taker!: number;
  created_at!: Date;
  updated_at!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof trading_fees {
    trading_fees.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    market_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "any"
    },
    group: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: "any"
    },
    maker: {
      type: DataTypes.DECIMAL(7,6),
      allowNull: false,
      defaultValue: 0.000000
    },
    taker: {
      type: DataTypes.DECIMAL(7,6),
      allowNull: false,
      defaultValue: 0.000000
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
    tableName: 'trading_fees',
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
        name: "index_trading_fees_on_market_id_and_group",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "market_id" },
          { name: "group" },
        ]
      },
      {
        name: "index_trading_fees_on_market_id",
        using: "BTREE",
        fields: [
          { name: "market_id" },
        ]
      },
      {
        name: "index_trading_fees_on_group",
        using: "BTREE",
        fields: [
          { name: "group" },
        ]
      },
    ]
  });
  return trading_fees;
  }
}
