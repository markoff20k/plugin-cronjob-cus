import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface whitelisted_smart_contractsAttributes {
  id: number;
  description?: string;
  address: string;
  state: string;
  blockchain_key: string;
  created_at: Date;
  updated_at: Date;
}

export type whitelisted_smart_contractsPk = "id";
export type whitelisted_smart_contractsId = whitelisted_smart_contracts[whitelisted_smart_contractsPk];
export type whitelisted_smart_contractsOptionalAttributes = "id" | "description";
export type whitelisted_smart_contractsCreationAttributes = Optional<whitelisted_smart_contractsAttributes, whitelisted_smart_contractsOptionalAttributes>;

export class whitelisted_smart_contracts extends Model<whitelisted_smart_contractsAttributes, whitelisted_smart_contractsCreationAttributes> implements whitelisted_smart_contractsAttributes {
  id!: number;
  description?: string;
  address!: string;
  state!: string;
  blockchain_key!: string;
  created_at!: Date;
  updated_at!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof whitelisted_smart_contracts {
    whitelisted_smart_contracts.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    state: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    blockchain_key: {
      type: DataTypes.STRING(32),
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
    tableName: 'whitelisted_smart_contracts',
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
        name: "index_whitelisted_smart_contracts_on_address_and_blockchain_key",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "address" },
          { name: "blockchain_key" },
        ]
      },
    ]
  });
  return whitelisted_smart_contracts;
  }
}
