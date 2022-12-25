import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface liabilitiesAttributes {
  id: number;
  code: number;
  currency_id: string;
  member_id?: number;
  reference_type?: string;
  reference_id?: number;
  debit: number;
  credit: number;
  created_at: Date;
  updated_at: Date;
}

export type liabilitiesPk = "id";
export type liabilitiesId = liabilities[liabilitiesPk];
export type liabilitiesOptionalAttributes = "id" | "member_id" | "reference_type" | "reference_id" | "debit" | "credit";
export type liabilitiesCreationAttributes = Optional<liabilitiesAttributes, liabilitiesOptionalAttributes>;

export class liabilities extends Model<liabilitiesAttributes, liabilitiesCreationAttributes> implements liabilitiesAttributes {
  id!: number;
  code!: number;
  currency_id!: string;
  member_id?: number;
  reference_type?: string;
  reference_id?: number;
  debit!: number;
  credit!: number;
  created_at!: Date;
  updated_at!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof liabilities {
    liabilities.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    code: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    currency_id: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    member_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    reference_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    reference_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    debit: {
      type: DataTypes.DECIMAL(34,18),
      allowNull: false,
      defaultValue: 0.000000000000000000
    },
    credit: {
      type: DataTypes.DECIMAL(34,18),
      allowNull: false,
      defaultValue: 0.000000000000000000
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
    tableName: 'liabilities',
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
        name: "index_liabilities_on_currency_id",
        using: "BTREE",
        fields: [
          { name: "currency_id" },
        ]
      },
      {
        name: "index_liabilities_on_member_id",
        using: "BTREE",
        fields: [
          { name: "member_id" },
        ]
      },
      {
        name: "index_liabilities_on_reference_type_and_reference_id",
        using: "BTREE",
        fields: [
          { name: "reference_type" },
          { name: "reference_id" },
        ]
      },
    ]
  });
  return liabilities;
  }
}
