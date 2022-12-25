import { Model, DataTypes, Optional } from 'sequelize';
import * as Sequelize from 'sequelize';

export interface UnstakeHistoryAttributes {
  id: number;
  member_id: number;
  currency_id: string;
  amount: number;
  completed_at: Date;
}

export type UnstakeHistoryCreationAttributes = Optional<
  UnstakeHistoryAttributes,
  'id'
>;

export class UnstakeHistoryModel
  extends Model<UnstakeHistoryAttributes, UnstakeHistoryCreationAttributes>
  implements UnstakeHistoryAttributes {
  id!: number;
  member_id!: number;
  currency_id!: string;
  amount!: number;
  completed_at!: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof UnstakeHistoryModel {
    UnstakeHistoryModel.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        member_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        currency_id: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        amount: {
          type: DataTypes.DECIMAL,
          allowNull: false,
        },
        completed_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        tableName: 'unstake',
        sequelize,
        timestamps: false,
      }
    );

    return UnstakeHistoryModel;
  }
}
