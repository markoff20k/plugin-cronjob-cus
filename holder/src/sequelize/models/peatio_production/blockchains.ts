import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface blockchainsAttributes {
  id: number;
  key: string;
  name?: string;
  client: string;
  server?: string;
  height: number;
  explorer_address?: string;
  explorer_transaction?: string;
  min_confirmations: number;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export type blockchainsPk = "id";
export type blockchainsId = blockchains[blockchainsPk];
export type blockchainsOptionalAttributes = "id" | "name" | "server" | "explorer_address" | "explorer_transaction" | "min_confirmations";
export type blockchainsCreationAttributes = Optional<blockchainsAttributes, blockchainsOptionalAttributes>;

export class blockchains extends Model<blockchainsAttributes, blockchainsCreationAttributes> implements blockchainsAttributes {
  id!: number;
  key!: string;
  name?: string;
  client!: string;
  server?: string;
  height!: number;
  explorer_address?: string;
  explorer_transaction?: string;
  min_confirmations!: number;
  status!: string;
  created_at!: Date;
  updated_at!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof blockchains {
    blockchains.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    key: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "index_blockchains_on_key"
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    client: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    server: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    height: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    explorer_address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    explorer_transaction: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    min_confirmations: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 6
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: false
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
    tableName: 'blockchains',
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
        name: "index_blockchains_on_key",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "key" },
        ]
      },
      {
        name: "index_blockchains_on_status",
        using: "BTREE",
        fields: [
          { name: "status" },
        ]
      },
    ]
  });
  return blockchains;
  }
}
