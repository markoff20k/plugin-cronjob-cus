import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface refundsAttributes {
  id: number;
  deposit_id: number;
  state: string;
  address: string;
  created_at: Date;
  updated_at: Date;
}

export type refundsPk = "id";
export type refundsId = refunds[refundsPk];
export type refundsOptionalAttributes = "id";
export type refundsCreationAttributes = Optional<refundsAttributes, refundsOptionalAttributes>;

export class refunds extends Model<refundsAttributes, refundsCreationAttributes> implements refundsAttributes {
  id!: number;
  deposit_id!: number;
  state!: string;
  address!: string;
  created_at!: Date;
  updated_at!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof refunds {
    refunds.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    deposit_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false
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
    tableName: 'refunds',
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
        name: "index_refunds_on_deposit_id",
        using: "BTREE",
        fields: [
          { name: "deposit_id" },
        ]
      },
      {
        name: "index_refunds_on_state",
        using: "BTREE",
        fields: [
          { name: "state" },
        ]
      },
    ]
  });
  return refunds;
  }
}
