import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface assetsAttributes {
  id: number;
  code: number;
  currency_id: string;
  reference_type?: string;
  reference_id?: number;
  debit: number;
  credit: number;
  created_at: Date;
  updated_at: Date;
}

export type assetsPk = "id";
export type assetsId = assets[assetsPk];
export type assetsOptionalAttributes = "id" | "reference_type" | "reference_id" | "debit" | "credit";
export type assetsCreationAttributes = Optional<assetsAttributes, assetsOptionalAttributes>;

export class assets extends Model<assetsAttributes, assetsCreationAttributes> implements assetsAttributes {
  id!: number;
  code!: number;
  currency_id!: string;
  reference_type?: string;
  reference_id?: number;
  debit!: number;
  credit!: number;
  created_at!: Date;
  updated_at!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof assets {
    assets.init({
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
    tableName: 'assets',
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
        name: "index_assets_on_currency_id",
        using: "BTREE",
        fields: [
          { name: "currency_id" },
        ]
      },
      {
        name: "index_assets_on_reference_type_and_reference_id",
        using: "BTREE",
        fields: [
          { name: "reference_type" },
          { name: "reference_id" },
        ]
      },
    ]
  });
  return assets;
  }
}
