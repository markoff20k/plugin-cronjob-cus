import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface marketsAttributes {
  id: string;
  base_unit: string;
  quote_unit: string;
  engine_id: number;
  amount_precision: number;
  price_precision: number;
  min_price: number;
  max_price: number;
  min_amount: number;
  position: number;
  data?: object;
  state: string;
  created_at: Date;
  updated_at: Date;
}

export type marketsPk = "id";
export type marketsId = markets[marketsPk];
export type marketsOptionalAttributes = "id" | "amount_precision" | "price_precision" | "min_price" | "max_price" | "min_amount" | "data" | "state";
export type marketsCreationAttributes = Optional<marketsAttributes, marketsOptionalAttributes>;

export class markets extends Model<marketsAttributes, marketsCreationAttributes> implements marketsAttributes {
  id!: string;
  base_unit!: string;
  quote_unit!: string;
  engine_id!: number;
  amount_precision!: number;
  price_precision!: number;
  min_price!: number;
  max_price!: number;
  min_amount!: number;
  position!: number;
  data?: object;
  state!: string;
  created_at!: Date;
  updated_at!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof markets {
    markets.init({
    id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    base_unit: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    quote_unit: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    engine_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    amount_precision: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 4
    },
    price_precision: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 4
    },
    min_price: {
      type: DataTypes.DECIMAL(32,16),
      allowNull: false,
      defaultValue: 0.0000000000000000
    },
    max_price: {
      type: DataTypes.DECIMAL(32,16),
      allowNull: false,
      defaultValue: 0.0000000000000000
    },
    min_amount: {
      type: DataTypes.DECIMAL(32,16),
      allowNull: false,
      defaultValue: 0.0000000000000000
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    data: {
      type: DataTypes.JSON,
      allowNull: true
    },
    state: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: "enabled"
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
    tableName: 'markets',
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
        name: "index_markets_on_base_unit_and_quote_unit",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "base_unit" },
          { name: "quote_unit" },
        ]
      },
      {
        name: "index_markets_on_base_unit",
        using: "BTREE",
        fields: [
          { name: "base_unit" },
        ]
      },
      {
        name: "index_markets_on_quote_unit",
        using: "BTREE",
        fields: [
          { name: "quote_unit" },
        ]
      },
      {
        name: "index_markets_on_position",
        using: "BTREE",
        fields: [
          { name: "position" },
        ]
      },
      {
        name: "index_markets_on_engine_id",
        using: "BTREE",
        fields: [
          { name: "engine_id" },
        ]
      },
    ]
  });
  return markets;
  }
}
