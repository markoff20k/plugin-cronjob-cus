import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface refund_trackingAttributes {
  id: number;
  withdraw_id: number;
  member_id: number;
  refunded_currency: string;
  refunded_amount: number;
  refund_at?: Date;
}

export type refund_trackingPk = "id";
export type refund_trackingId = refund_tracking[refund_trackingPk];
export type refund_trackingOptionalAttributes = "id" | "refund_at";
export type refund_trackingCreationAttributes = Optional<
  refund_trackingAttributes,
  refund_trackingOptionalAttributes
>;

export class refund_tracking
  extends Model<refund_trackingAttributes, refund_trackingCreationAttributes>
  implements refund_trackingAttributes
{
  id!: number;
  withdraw_id!: number;
  member_id!: number;
  refunded_currency!: string;
  refunded_amount!: number;
  refund_at?: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof refund_tracking {
    refund_tracking.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
        },
        withdraw_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          references: {
            model: "withdraws",
            key: "id",
          },
        },
        member_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        refunded_currency: {
          type: DataTypes.STRING(10),
          allowNull: false,
        },
        refunded_amount: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        refund_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "refund_tracking",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "fk_withdraw_id",
            using: "BTREE",
            fields: [{ name: "withdraw_id" }],
          },
        ],
      }
    );
    return refund_tracking;
  }
}
