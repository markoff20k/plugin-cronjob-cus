import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface withdrawsAttributes {
  id: number;
  member_id: number;
  beneficiary_id?: number;
  currency_id: string;
  amount: number;
  fee: number;
  txid?: string;
  aasm_state: string;
  block_number?: number;
  sum: number;
  type: string;
  transfer_type?: number;
  tid: string;
  rid: string;
  note?: string;
  metadata?: object;
  error?: object;
  created_at: Date;
  updated_at: Date;
  completed_at?: Date;
}

export type withdrawsPk = "id";
export type withdrawsId = withdraws[withdrawsPk];
export type withdrawsOptionalAttributes = "id" | "beneficiary_id" | "txid" | "block_number" | "transfer_type" | "note" | "metadata" | "error" | "completed_at";
export type withdrawsCreationAttributes = Optional<withdrawsAttributes, withdrawsOptionalAttributes>;

export class withdraws extends Model<withdrawsAttributes, withdrawsCreationAttributes> implements withdrawsAttributes {
  id!: number;
  member_id!: number;
  beneficiary_id?: number;
  currency_id!: string;
  amount!: number;
  fee!: number;
  txid?: string;
  aasm_state!: string;
  block_number?: number;
  sum!: number;
  type!: string;
  transfer_type?: number;
  tid!: string;
  rid!: string;
  note?: string;
  metadata?: object;
  error?: object;
  created_at!: Date;
  updated_at!: Date;
  completed_at?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof withdraws {
    withdraws.init({
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
    beneficiary_id: {
      type: DataTypes.BIGINT,
      allowNull: true
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
    txid: {
      type: DataTypes.STRING(128),
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
    sum: {
      type: DataTypes.DECIMAL(34,18),
      allowNull: false
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
    rid: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    note: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    metadata: {
      type: DataTypes.JSON,
      allowNull: true
    },
    error: {
      type: DataTypes.JSON,
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
    tableName: 'withdraws',
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
        name: "index_withdraws_on_currency_id_and_txid",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "currency_id" },
          { name: "txid" },
        ]
      },
      {
        name: "index_withdraws_on_currency_id",
        using: "BTREE",
        fields: [
          { name: "currency_id" },
        ]
      },
      {
        name: "index_withdraws_on_aasm_state",
        using: "BTREE",
        fields: [
          { name: "aasm_state" },
        ]
      },
      {
        name: "index_withdraws_on_member_id",
        using: "BTREE",
        fields: [
          { name: "member_id" },
        ]
      },
      {
        name: "index_withdraws_on_type",
        using: "BTREE",
        fields: [
          { name: "type" },
        ]
      },
      {
        name: "index_withdraws_on_tid",
        using: "BTREE",
        fields: [
          { name: "tid" },
        ]
      },
    ]
  });
  return withdraws;
  }
}
