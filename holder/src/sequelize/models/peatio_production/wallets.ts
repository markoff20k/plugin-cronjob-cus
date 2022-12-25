import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface walletsAttributes {
  id: number;
  blockchain_key?: string;
  name?: string;
  address: string;
  kind: number;
  gateway: string;
  settings_encrypted?: string;
  balance?: object;
  max_balance: number;
  status?: string;
  created_at: Date;
  updated_at: Date;
}

export type walletsPk = "id";
export type walletsId = wallets[walletsPk];
export type walletsOptionalAttributes = "id" | "blockchain_key" | "name" | "gateway" | "settings_encrypted" | "balance" | "max_balance" | "status";
export type walletsCreationAttributes = Optional<walletsAttributes, walletsOptionalAttributes>;

export class wallets extends Model<walletsAttributes, walletsCreationAttributes> implements walletsAttributes {
  id!: number;
  blockchain_key?: string;
  name?: string;
  address!: string;
  kind!: number;
  gateway!: string;
  settings_encrypted?: string;
  balance?: object;
  max_balance!: number;
  status?: string;
  created_at!: Date;
  updated_at!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof wallets {
    wallets.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    blockchain_key: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    kind: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    gateway: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ""
    },
    settings_encrypted: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    balance: {
      type: DataTypes.JSON,
      allowNull: true
    },
    max_balance: {
      type: DataTypes.DECIMAL(34,18),
      allowNull: false,
      defaultValue: 0.000000000000000000
    },
    status: {
      type: DataTypes.STRING(32),
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
    tableName: 'wallets',
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
        name: "index_wallets_on_status",
        using: "BTREE",
        fields: [
          { name: "status" },
        ]
      },
      {
        name: "index_wallets_on_kind",
        using: "BTREE",
        fields: [
          { name: "kind" },
        ]
      },
      {
        name: "index_wallets_on_kind_and_currency_id_and_status",
        using: "BTREE",
        fields: [
          { name: "kind" },
          { name: "status" },
        ]
      },
    ]
  });
  return wallets;
  }
}
