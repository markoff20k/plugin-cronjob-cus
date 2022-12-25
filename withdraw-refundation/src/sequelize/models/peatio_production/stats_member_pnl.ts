import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface stats_member_pnlAttributes {
  id: number;
  member_id: number;
  pnl_currency_id: string;
  currency_id: string;
  total_credit?: number;
  total_credit_fees?: number;
  total_debit_fees?: number;
  total_debit?: number;
  total_credit_value?: number;
  total_debit_value?: number;
  total_balance_value?: number;
  average_balance_price?: number;
  created_at: Date;
  updated_at: Date;
}

export type stats_member_pnlPk = "id";
export type stats_member_pnlId = stats_member_pnl[stats_member_pnlPk];
export type stats_member_pnlOptionalAttributes = "id" | "total_credit" | "total_credit_fees" | "total_debit_fees" | "total_debit" | "total_credit_value" | "total_debit_value" | "total_balance_value" | "average_balance_price" | "created_at" | "updated_at";
export type stats_member_pnlCreationAttributes = Optional<stats_member_pnlAttributes, stats_member_pnlOptionalAttributes>;

export class stats_member_pnl extends Model<stats_member_pnlAttributes, stats_member_pnlCreationAttributes> implements stats_member_pnlAttributes {
  id!: number;
  member_id!: number;
  pnl_currency_id!: string;
  currency_id!: string;
  total_credit?: number;
  total_credit_fees?: number;
  total_debit_fees?: number;
  total_debit?: number;
  total_credit_value?: number;
  total_debit_value?: number;
  total_balance_value?: number;
  average_balance_price?: number;
  created_at!: Date;
  updated_at!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof stats_member_pnl {
    stats_member_pnl.init({
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
    pnl_currency_id: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    currency_id: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    total_credit: {
      type: DataTypes.DECIMAL(48,16),
      allowNull: true,
      defaultValue: 0.0000000000000000
    },
    total_credit_fees: {
      type: DataTypes.DECIMAL(48,16),
      allowNull: true,
      defaultValue: 0.0000000000000000
    },
    total_debit_fees: {
      type: DataTypes.DECIMAL(48,16),
      allowNull: true,
      defaultValue: 0.0000000000000000
    },
    total_debit: {
      type: DataTypes.DECIMAL(48,16),
      allowNull: true,
      defaultValue: 0.0000000000000000
    },
    total_credit_value: {
      type: DataTypes.DECIMAL(48,16),
      allowNull: true,
      defaultValue: 0.0000000000000000
    },
    total_debit_value: {
      type: DataTypes.DECIMAL(48,16),
      allowNull: true,
      defaultValue: 0.0000000000000000
    },
    total_balance_value: {
      type: DataTypes.DECIMAL(48,16),
      allowNull: true,
      defaultValue: 0.0000000000000000
    },
    average_balance_price: {
      type: DataTypes.DECIMAL(48,16),
      allowNull: true,
      defaultValue: 0.0000000000000000
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'stats_member_pnl',
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
        name: "index_currency_ids_and_member_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "pnl_currency_id" },
          { name: "currency_id" },
          { name: "member_id" },
        ]
      },
    ]
  });
  return stats_member_pnl;
  }
}
