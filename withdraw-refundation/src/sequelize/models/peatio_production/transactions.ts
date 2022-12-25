import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface transactionsAttributes {
  id: number;
  currency_id: string;
  reference_type?: string;
  reference_id?: number;
  txid?: string;
  from_address?: string;
  to_address?: string;
  amount: number;
  block_number?: number;
  txout?: number;
  status?: string;
  options?: object;
  created_at: Date;
  updated_at: Date;
}

export type transactionsPk = "id";
export type transactionsId = transactions[transactionsPk];
export type transactionsOptionalAttributes = "id" | "reference_type" | "reference_id" | "txid" | "from_address" | "to_address" | "amount" | "block_number" | "txout" | "status" | "options";
export type transactionsCreationAttributes = Optional<transactionsAttributes, transactionsOptionalAttributes>;

export class transactions extends Model<transactionsAttributes, transactionsCreationAttributes> implements transactionsAttributes {
  id!: number;
  currency_id!: string;
  reference_type?: string;
  reference_id?: number;
  txid?: string;
  from_address?: string;
  to_address?: string;
  amount!: number;
  block_number?: number;
  txout?: number;
  status?: string;
  options?: object;
  created_at!: Date;
  updated_at!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof transactions {
    transactions.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    currency_id: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    reference_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    reference_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    txid: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    from_address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    to_address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    amount: {
      type: DataTypes.DECIMAL(32,16),
      allowNull: false,
      defaultValue: 0.0000000000000000
    },
    block_number: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    txout: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    options: {
      type: DataTypes.JSON,
      allowNull: true
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
    tableName: 'transactions',
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
        name: "index_transactions_on_currency_id_and_txid",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "currency_id" },
          { name: "txid" },
        ]
      },
      {
        name: "index_transactions_on_reference_type_and_reference_id",
        using: "BTREE",
        fields: [
          { name: "reference_type" },
          { name: "reference_id" },
        ]
      },
      {
        name: "index_transactions_on_txid",
        using: "BTREE",
        fields: [
          { name: "txid" },
        ]
      },
      {
        name: "index_transactions_on_currency_id",
        using: "BTREE",
        fields: [
          { name: "currency_id" },
        ]
      },
    ]
  });
  return transactions;
  }
}
