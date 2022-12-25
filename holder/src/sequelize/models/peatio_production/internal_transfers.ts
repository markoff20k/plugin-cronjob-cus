import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface internal_transfersAttributes {
  id: number;
  currency_id: string;
  amount: number;
  sender_id: number;
  receiver_id: number;
  state: number;
  created_at: Date;
  updated_at: Date;
}

export type internal_transfersPk = "id";
export type internal_transfersId = internal_transfers[internal_transfersPk];
export type internal_transfersOptionalAttributes = "id" | "state";
export type internal_transfersCreationAttributes = Optional<internal_transfersAttributes, internal_transfersOptionalAttributes>;

export class internal_transfers extends Model<internal_transfersAttributes, internal_transfersCreationAttributes> implements internal_transfersAttributes {
  id!: number;
  currency_id!: string;
  amount!: number;
  sender_id!: number;
  receiver_id!: number;
  state!: number;
  created_at!: Date;
  updated_at!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof internal_transfers {
    internal_transfers.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    currency_id: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(32,16),
      allowNull: false
    },
    sender_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    receiver_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    state: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
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
    tableName: 'internal_transfers',
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
    ]
  });
  return internal_transfers;
  }
}
