import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface transfer_trackingAttributes {
  id: number;
  withdraw_id?: number;
  currency_id: string;
  member_id: number;
  amount: number;
  status?: string;
  parent_currency: string;
  child_currency: string;
  parent_balance: number;
  new_parent_balance: number;
  child_balance: number;
  new_child_balance: number;
  completed_at: Date;
  fee: number;
}

export type transfer_trackingPk = "id";
export type transfer_trackingId = transfer_tracking[transfer_trackingPk];
export type transfer_trackingOptionalAttributes = "id" | "withdraw_id" | "status";
export type transfer_trackingCreationAttributes = Optional<transfer_trackingAttributes, transfer_trackingOptionalAttributes>;

export class transfer_tracking extends Model<transfer_trackingAttributes, transfer_trackingCreationAttributes> implements transfer_trackingAttributes {
  id!: number;
  withdraw_id?: number;
  currency_id!: string;
  member_id!: number;
  amount!: number;
  status?: string;
  parent_currency!: string;
  child_currency!: string;
  parent_balance!: number;
  new_parent_balance!: number;
  child_balance!: number;
  new_child_balance!: number;
  completed_at!: Date;
  fee!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof transfer_tracking {
    transfer_tracking.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    withdraw_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    currency_id: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    member_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(34,18),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    parent_currency: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    child_currency: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    parent_balance: {
      type: DataTypes.DECIMAL(34,18),
      allowNull: false
    },
    new_parent_balance: {
      type: DataTypes.DECIMAL(34,18),
      allowNull: false
    },
    child_balance: {
      type: DataTypes.DECIMAL(34,18),
      allowNull: false
    },
    new_child_balance: {
      type: DataTypes.DECIMAL(34,18),
      allowNull: false
    },
    completed_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    fee: {
      type: DataTypes.DECIMAL(34,18),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'transfer_tracking',
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
        name: "fk_member_id",
        using: "BTREE",
        fields: [
          { name: "member_id" },
        ]
      },
    ]
  });
  return transfer_tracking;
  }
}
