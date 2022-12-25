import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface accountsAttributes {
  member_id: number;
  currency_id: string;
  balance?: number;
  locked?: number;
  created_at: Date;
  updated_at: Date;
}

export type accountsPk = "member_id" | "currency_id";
export type accountsId = accounts[accountsPk];
export type accountsCreationAttributes = Optional<accountsAttributes, accountsPk>;

export class accounts extends Model<accountsAttributes, accountsCreationAttributes> implements accountsAttributes {
  member_id!: number;
  currency_id!: string;
  balance?: number;
  locked?: number;
  created_at!: Date;
  updated_at!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof accounts {
    accounts.init({
    member_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    currency_id: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    balance: {
      type: DataTypes.DECIMAL(32,16),
      allowNull: false,
      defaultValue: 0.0000000000000000
    },
    locked: {
      type: DataTypes.DECIMAL(32,16),
      allowNull: false,
      defaultValue: 0.0000000000000000
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
    tableName: 'accounts',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "currency_id" },
          { name: "member_id" },
        ]
      },
      {
        name: "index_accounts_on_currency_id_and_member_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "currency_id" },
          { name: "member_id" },
        ]
      },
      {
        name: "index_accounts_on_member_id",
        using: "BTREE",
        fields: [
          { name: "member_id" },
        ]
      },
    ]
  });
  return accounts;
  }
}
