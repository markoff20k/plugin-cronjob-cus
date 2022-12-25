import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface profitsAttributes {
  id: number;
  trade?: number;
  deposit?: number;
  withdraw?: number;
  total?: number;
  updated_at: Date;
}

export type profitsPk = "id";
export type profitsId = profits[profitsPk];
export type profitsOptionalAttributes = "id" | "trade" | "deposit" | "withdraw" | "total" | "updated_at";
export type profitsCreationAttributes = Optional<profitsAttributes, profitsOptionalAttributes>;

export class profits extends Model<profitsAttributes, profitsCreationAttributes> implements profitsAttributes {
  id!: number;
  trade?: number;
  deposit?: number;
  withdraw?: number;
  total?: number;
  updated_at!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof profits {
    profits.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    trade: {
      type: DataTypes.DECIMAL(38,14),
      allowNull: true
    },
    deposit: {
      type: DataTypes.DECIMAL(38,14),
      allowNull: true
    },
    withdraw: {
      type: DataTypes.DECIMAL(38,14),
      allowNull: true
    },
    total: {
      type: DataTypes.DECIMAL(38,14),
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'profits',
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
  return profits;
  }
}
