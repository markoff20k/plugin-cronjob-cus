import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface unstakeAttributes {
  id: number;
  member_id: number;
  currency_id: string;
  amount: number;
  completed_at: Date;
}

export type unstakePk = "id";
export type unstakeId = unstake[unstakePk];
export type unstakeOptionalAttributes = "id" | "completed_at";
export type unstakeCreationAttributes = Optional<unstakeAttributes, unstakeOptionalAttributes>;

export class unstake extends Model<unstakeAttributes, unstakeCreationAttributes> implements unstakeAttributes {
  id!: number;
  member_id!: number;
  currency_id!: string;
  amount!: number;
  completed_at!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof unstake {
    unstake.init({
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
    currency_id: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(32,16),
      allowNull: false
    },
    completed_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'unstake',
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
  return unstake;
  }
}
