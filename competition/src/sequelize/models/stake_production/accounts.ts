import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface accountsAttributes {
  id: number;
  member_id: number;
  currency_id: string;
  balance: number;
  locked: number;
  created_at: Date;
  updated_at: Date;
}

export type accountsPk = "id";
export type accountsId = accounts[accountsPk];
export type accountsOptionalAttributes = "id" | "balance" | "locked";
export type accountsCreationAttributes = Optional<accountsAttributes, accountsOptionalAttributes>;

export class accounts extends Model<accountsAttributes, accountsCreationAttributes> implements accountsAttributes {
  id!: number;
  member_id!: number;
  currency_id!: string;
  balance!: number;
  locked!: number;
  created_at!: Date;
  updated_at!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof accounts {
    accounts.init({
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
          { name: "id" },
        ]
      },
    ]
  });
  return accounts;
  }
}
