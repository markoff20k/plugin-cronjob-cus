import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface stats_member_pnl_idxAttributes {
  id: number;
  pnl_currency_id: string;
  currency_id: string;
  reference_type: string;
  last_id?: number;
  created_at: Date;
  updated_at: Date;
}

export type stats_member_pnl_idxPk = "id";
export type stats_member_pnl_idxId = stats_member_pnl_idx[stats_member_pnl_idxPk];
export type stats_member_pnl_idxOptionalAttributes = "id" | "last_id" | "created_at" | "updated_at";
export type stats_member_pnl_idxCreationAttributes = Optional<stats_member_pnl_idxAttributes, stats_member_pnl_idxOptionalAttributes>;

export class stats_member_pnl_idx extends Model<stats_member_pnl_idxAttributes, stats_member_pnl_idxCreationAttributes> implements stats_member_pnl_idxAttributes {
  id!: number;
  pnl_currency_id!: string;
  currency_id!: string;
  reference_type!: string;
  last_id?: number;
  created_at!: Date;
  updated_at!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof stats_member_pnl_idx {
    stats_member_pnl_idx.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    pnl_currency_id: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    currency_id: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    reference_type: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    last_id: {
      type: DataTypes.BIGINT,
      allowNull: true
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
    tableName: 'stats_member_pnl_idx',
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
        name: "index_currency_ids_and_type",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "pnl_currency_id" },
          { name: "currency_id" },
          { name: "reference_type" },
        ]
      },
      {
        name: "index_currency_ids_and_last_id",
        using: "BTREE",
        fields: [
          { name: "pnl_currency_id" },
          { name: "currency_id" },
          { name: "last_id" },
        ]
      },
    ]
  });
  return stats_member_pnl_idx;
  }
}
