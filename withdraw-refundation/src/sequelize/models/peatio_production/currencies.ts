import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface currenciesAttributes {
  id: string;
  name?: string;
  description?: string;
  homepage?: string;
  blockchain_key?: string;
  parent_id?: string;
  type: string;
  deposit_fee: number;
  min_deposit_amount: number;
  min_collection_amount: number;
  withdraw_fee: number;
  min_withdraw_amount: number;
  withdraw_limit_24h: number;
  withdraw_limit_72h: number;
  position: number;
  options?: object;
  visible: number;
  deposit_enabled: number;
  withdrawal_enabled: number;
  base_factor: number;
  precision: number;
  icon_url?: string;
  price: number;
  created_at: Date;
  updated_at: Date;
}

export type currenciesPk = "id";
export type currenciesId = currencies[currenciesPk];
export type currenciesOptionalAttributes = "id" | "name" | "description" | "homepage" | "blockchain_key" | "parent_id" | "type" | "deposit_fee" | "min_deposit_amount" | "min_collection_amount" | "withdraw_fee" | "min_withdraw_amount" | "withdraw_limit_24h" | "withdraw_limit_72h" | "options" | "visible" | "deposit_enabled" | "withdrawal_enabled" | "base_factor" | "precision" | "icon_url" | "price";
export type currenciesCreationAttributes = Optional<currenciesAttributes, currenciesOptionalAttributes>;

export class currencies extends Model<currenciesAttributes, currenciesCreationAttributes> implements currenciesAttributes {
  id!: string;
  name?: string;
  description?: string;
  homepage?: string;
  blockchain_key?: string;
  parent_id?: string;
  type!: string;
  deposit_fee!: number;
  min_deposit_amount!: number;
  min_collection_amount!: number;
  withdraw_fee!: number;
  min_withdraw_amount!: number;
  withdraw_limit_24h!: number;
  withdraw_limit_72h!: number;
  position!: number;
  options?: object;
  visible!: number;
  deposit_enabled!: number;
  withdrawal_enabled!: number;
  base_factor!: number;
  precision!: number;
  icon_url?: string;
  price!: number;
  created_at!: Date;
  updated_at!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof currencies {
    currencies.init({
    id: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    homepage: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    blockchain_key: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    parent_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: "coin"
    },
    deposit_fee: {
      type: DataTypes.DECIMAL(34,18),
      allowNull: false,
      defaultValue: 0.000000000000000000
    },
    min_deposit_amount: {
      type: DataTypes.DECIMAL(34,18),
      allowNull: false,
      defaultValue: 0.000000000000000000
    },
    min_collection_amount: {
      type: DataTypes.DECIMAL(34,18),
      allowNull: false,
      defaultValue: 0.000000000000000000
    },
    withdraw_fee: {
      type: DataTypes.DECIMAL(34,18),
      allowNull: false,
      defaultValue: 0.000000000000000000
    },
    min_withdraw_amount: {
      type: DataTypes.DECIMAL(34,18),
      allowNull: false,
      defaultValue: 0.000000000000000000
    },
    withdraw_limit_24h: {
      type: DataTypes.DECIMAL(34,18),
      allowNull: false,
      defaultValue: 0.000000000000000000
    },
    withdraw_limit_72h: {
      type: DataTypes.DECIMAL(34,18),
      allowNull: false,
      defaultValue: 0.000000000000000000
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    options: {
      type: DataTypes.JSON,
      allowNull: true
    },
    visible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    },
    deposit_enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    },
    withdrawal_enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    },
    base_factor: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 1
    },
    precision: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 8
    },
    icon_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL(32,16),
      allowNull: false,
      defaultValue: 1.0000000000000000
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
    tableName: 'currencies',
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
        name: "index_currencies_on_visible",
        using: "BTREE",
        fields: [
          { name: "visible" },
        ]
      },
      {
        name: "index_currencies_on_position",
        using: "BTREE",
        fields: [
          { name: "position" },
        ]
      },
      {
        name: "index_currencies_on_parent_id",
        using: "BTREE",
        fields: [
          { name: "parent_id" },
        ]
      },
    ]
  });
  return currencies;
  }
}
