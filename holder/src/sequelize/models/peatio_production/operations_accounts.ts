import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface operations_accountsAttributes {
  id: number;
  code: number;
  type: string;
  kind: string;
  currency_type: string;
  description?: string;
  scope: string;
  created_at: Date;
  updated_at: Date;
}

export type operations_accountsPk = "id";
export type operations_accountsId = operations_accounts[operations_accountsPk];
export type operations_accountsOptionalAttributes = "id" | "description";
export type operations_accountsCreationAttributes = Optional<operations_accountsAttributes, operations_accountsOptionalAttributes>;

export class operations_accounts extends Model<operations_accountsAttributes, operations_accountsCreationAttributes> implements operations_accountsAttributes {
  id!: number;
  code!: number;
  type!: string;
  kind!: string;
  currency_type!: string;
  description?: string;
  scope!: string;
  created_at!: Date;
  updated_at!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof operations_accounts {
    operations_accounts.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    code: {
      type: DataTypes.MEDIUMINT,
      allowNull: false,
      unique: "index_operations_accounts_on_code"
    },
    type: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    kind: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    currency_type: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    scope: {
      type: DataTypes.STRING(10),
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
    tableName: 'operations_accounts',
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
        name: "index_operations_accounts_on_code",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "code" },
        ]
      },
      {
        name: "index_operations_accounts_on_type_and_kind_and_currency_type",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "type" },
          { name: "kind" },
          { name: "currency_type" },
        ]
      },
      {
        name: "index_operations_accounts_on_type",
        using: "BTREE",
        fields: [
          { name: "type" },
        ]
      },
      {
        name: "index_operations_accounts_on_currency_type",
        using: "BTREE",
        fields: [
          { name: "currency_type" },
        ]
      },
      {
        name: "index_operations_accounts_on_scope",
        using: "BTREE",
        fields: [
          { name: "scope" },
        ]
      },
    ]
  });
  return operations_accounts;
  }
}
