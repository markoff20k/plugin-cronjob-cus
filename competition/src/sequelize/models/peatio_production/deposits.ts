import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface depositsAttributes {
  id: number;
  member_id: number;
  currency_id: string;
  amount: number;
  fee: number;
  address?: string;
  from_addresses?: string;
  txid?: string;
  txout?: number;
  aasm_state: string;
  block_number?: number;
  type: string;
  transfer_type?: number;
  tid: string;
  spread?: string;
  created_at: Date;
  updated_at: Date;
  completed_at?: Date;
}

export type depositsPk = "id";
export type depositsId = deposits[depositsPk];
export type depositsCreationAttributes = Optional<depositsAttributes, depositsPk>;

export class deposits extends Model<depositsAttributes, depositsCreationAttributes> implements depositsAttributes {
  id!: number;
  member_id!: number;
  currency_id!: string;
  amount!: number;
  fee!: number;
  address?: string;
  from_addresses?: string;
  txid?: string;
  txout?: number;
  aasm_state!: string;
  block_number?: number;
  type!: string;
  transfer_type?: number;
  tid!: string;
  spread?: string;
  created_at!: Date;
  updated_at!: Date;
  completed_at?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof deposits {
    deposits.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    member_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    currency_id: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(34,18),
      allowNull: false
    },
    fee: {
      type: DataTypes.DECIMAL(34,18),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(95),
      allowNull: true
    },
    from_addresses: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    txid: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    txout: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    aasm_state: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    block_number: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    transfer_type: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    tid: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    spread: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE(3),
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE(3),
      allowNull: false
    },
    completed_at: {
      type: DataTypes.DATE(3),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'deposits',
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
        name: "index_deposits_on_currency_id_and_txid_and_txout",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "currency_id" },
          { name: "txid" },
          { name: "txout" },
        ]
      },
      {
        name: "index_deposits_on_currency_id",
        using: "BTREE",
        fields: [
          { name: "currency_id" },
        ]
      },
      {
        name: "index_deposits_on_type",
        using: "BTREE",
        fields: [
          { name: "type" },
        ]
      },
      {
        name: "index_deposits_on_member_id_and_txid",
        using: "BTREE",
        fields: [
          { name: "member_id" },
          { name: "txid" },
        ]
      },
      {
        name: "index_deposits_on_aasm_state_and_member_id_and_currency_id",
        using: "BTREE",
        fields: [
          { name: "aasm_state" },
          { name: "member_id" },
          { name: "currency_id" },
        ]
      },
      {
        name: "index_deposits_on_tid",
        using: "BTREE",
        fields: [
          { name: "tid" },
        ]
      },
    ]
  });
  return deposits;
  }
}
