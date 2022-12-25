import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface adjustmentsAttributes {
  id: number;
  reason: string;
  description: string;
  creator_id: number;
  validator_id?: number;
  amount: number;
  asset_account_code: number;
  receiving_account_number: string;
  currency_id: string;
  category: number;
  state: number;
  created_at: Date;
  updated_at: Date;
}

export type adjustmentsPk = "id";
export type adjustmentsId = adjustments[adjustmentsPk];
export type adjustmentsOptionalAttributes = "id" | "validator_id";
export type adjustmentsCreationAttributes = Optional<adjustmentsAttributes, adjustmentsOptionalAttributes>;

export class adjustments extends Model<adjustmentsAttributes, adjustmentsCreationAttributes> implements adjustmentsAttributes {
  id!: number;
  reason!: string;
  description!: string;
  creator_id!: number;
  validator_id?: number;
  amount!: number;
  asset_account_code!: number;
  receiving_account_number!: string;
  currency_id!: string;
  category!: number;
  state!: number;
  created_at!: Date;
  updated_at!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof adjustments {
    adjustments.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    reason: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    creator_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    validator_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    amount: {
      type: DataTypes.DECIMAL(32,16),
      allowNull: false
    },
    asset_account_code: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false
    },
    receiving_account_number: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    currency_id: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    category: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    state: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE(3),
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE(3),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'adjustments',
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
        name: "index_adjustments_on_currency_id",
        using: "BTREE",
        fields: [
          { name: "currency_id" },
        ]
      },
      {
        name: "index_adjustments_on_currency_id_and_state",
        using: "BTREE",
        fields: [
          { name: "currency_id" },
          { name: "state" },
        ]
      },
    ]
  });
  return adjustments;
  }
}
