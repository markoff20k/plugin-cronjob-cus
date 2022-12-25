import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ordersAttributes {
  id: number;
  uuid: any;
  remote_id?: string;
  bid: string;
  ask: string;
  market_id: string;
  price?: number;
  volume: number;
  origin_volume: number;
  maker_fee: number;
  taker_fee: number;
  state: number;
  type: string;
  member_id: number;
  ord_type: string;
  locked: number;
  origin_locked: number;
  funds_received?: number;
  trades_count: number;
  created_at: Date;
  updated_at: Date;
}

export type ordersPk = "id";
export type ordersId = orders[ordersPk];
export type ordersOptionalAttributes = "id" | "remote_id" | "price" | "maker_fee" | "taker_fee" | "locked" | "origin_locked" | "funds_received" | "trades_count";
export type ordersCreationAttributes = Optional<ordersAttributes, ordersOptionalAttributes>;

export class orders extends Model<ordersAttributes, ordersCreationAttributes> implements ordersAttributes {
  id!: number;
  uuid!: any;
  remote_id?: string;
  bid!: string;
  ask!: string;
  market_id!: string;
  price?: number;
  volume!: number;
  origin_volume!: number;
  maker_fee!: number;
  taker_fee!: number;
  state!: number;
  type!: string;
  member_id!: number;
  ord_type!: string;
  locked!: number;
  origin_locked!: number;
  funds_received?: number;
  trades_count!: number;
  created_at!: Date;
  updated_at!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof orders {
    orders.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    uuid: {
      type: DataTypes.BLOB,
      allowNull: false,
      unique: "index_orders_on_uuid"
    },
    remote_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    bid: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    ask: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    market_id: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(32,16),
      allowNull: true
    },
    volume: {
      type: DataTypes.DECIMAL(32,16),
      allowNull: false
    },
    origin_volume: {
      type: DataTypes.DECIMAL(32,16),
      allowNull: false
    },
    maker_fee: {
      type: DataTypes.DECIMAL(17,16),
      allowNull: false,
      defaultValue: 0.0000000000000000
    },
    taker_fee: {
      type: DataTypes.DECIMAL(17,16),
      allowNull: false,
      defaultValue: 0.0000000000000000
    },
    state: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING(8),
      allowNull: false
    },
    member_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    ord_type: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    locked: {
      type: DataTypes.DECIMAL(32,16),
      allowNull: false,
      defaultValue: 0.0000000000000000
    },
    origin_locked: {
      type: DataTypes.DECIMAL(32,16),
      allowNull: false,
      defaultValue: 0.0000000000000000
    },
    funds_received: {
      type: DataTypes.DECIMAL(32,16),
      allowNull: true,
      defaultValue: 0.0000000000000000
    },
    trades_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
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
    tableName: 'orders',
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
        name: "index_orders_on_uuid",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "uuid" },
        ]
      },
      {
        name: "index_orders_on_member_id",
        using: "BTREE",
        fields: [
          { name: "member_id" },
        ]
      },
      {
        name: "index_orders_on_state",
        using: "BTREE",
        fields: [
          { name: "state" },
        ]
      },
      {
        name: "index_orders_on_type_and_state_and_member_id",
        using: "BTREE",
        fields: [
          { name: "type" },
          { name: "state" },
          { name: "member_id" },
        ]
      },
      {
        name: "index_orders_on_type_and_state_and_market_id",
        using: "BTREE",
        fields: [
          { name: "type" },
          { name: "state" },
          { name: "market_id" },
        ]
      },
      {
        name: "index_orders_on_type_and_market_id",
        using: "BTREE",
        fields: [
          { name: "type" },
          { name: "market_id" },
        ]
      },
      {
        name: "index_orders_on_type_and_member_id",
        using: "BTREE",
        fields: [
          { name: "type" },
          { name: "member_id" },
        ]
      },
      {
        name: "index_orders_on_updated_at",
        using: "BTREE",
        fields: [
          { name: "updated_at" },
        ]
      },
    ]
  });
  return orders;
  }
}
