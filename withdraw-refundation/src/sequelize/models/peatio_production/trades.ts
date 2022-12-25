import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface tradesAttributes {
  id: number;
  price: number;
  amount: number;
  total: number;
  maker_order_id: number;
  taker_order_id: number;
  market_id: string;
  maker_id: number;
  taker_id: number;
  taker_type: string;
  created_at: Date;
  updated_at: Date;
}

export type tradesPk = "id";
export type tradesId = trades[tradesPk];
export type tradesOptionalAttributes = "id" | "total" | "taker_type";
export type tradesCreationAttributes = Optional<tradesAttributes, tradesOptionalAttributes>;

export class trades extends Model<tradesAttributes, tradesCreationAttributes> implements tradesAttributes {
  id!: number;
  price!: number;
  amount!: number;
  total!: number;
  maker_order_id!: number;
  taker_order_id!: number;
  market_id!: string;
  maker_id!: number;
  taker_id!: number;
  taker_type!: string;
  created_at!: Date;
  updated_at!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof trades {
    trades.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    price: {
      type: DataTypes.DECIMAL(32,16),
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(32,16),
      allowNull: false
    },
    total: {
      type: DataTypes.DECIMAL(32,16),
      allowNull: false,
      defaultValue: 0.0000000000000000
    },
    maker_order_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    taker_order_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    market_id: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    maker_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    taker_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    taker_type: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ""
    },
    created_at: {
      type: DataTypes.DATE(3),
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE(3),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'trades',
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
        name: "index_trades_on_maker_order_id",
        using: "BTREE",
        fields: [
          { name: "maker_order_id" },
        ]
      },
      {
        name: "index_trades_on_taker_order_id",
        using: "BTREE",
        fields: [
          { name: "taker_order_id" },
        ]
      },
      {
        name: "index_trades_on_market_id_and_created_at",
        using: "BTREE",
        fields: [
          { name: "market_id" },
          { name: "created_at" },
        ]
      },
      {
        name: "index_trades_on_created_at",
        using: "BTREE",
        fields: [
          { name: "created_at" },
        ]
      },
      {
        name: "index_trades_on_maker_id",
        using: "BTREE",
        fields: [
          { name: "maker_id" },
        ]
      },
      {
        name: "index_trades_on_taker_id",
        using: "BTREE",
        fields: [
          { name: "taker_id" },
        ]
      },
      {
        name: "index_trades_on_taker_type",
        using: "BTREE",
        fields: [
          { name: "taker_type" },
        ]
      },
    ]
  });
  return trades;
  }
}
