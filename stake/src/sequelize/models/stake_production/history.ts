import { StakeModel } from './stakes';
import { Model, DataTypes, Optional } from 'sequelize';
import * as Sequelize from 'sequelize';
import { RewardModel } from './rewards';

export interface StakeHistoryAttributes {
  id: number;
  member_id: number;
  stake_id: number;
  reward_id: number;
  amount: number;
  lockup_date: Date;
  release_date: Date;
  status: number;
}

export type StakeHistoryCreationAttributes = Optional<
  StakeHistoryAttributes,
  'id'
>;

export class StakeHistoryModel
  extends Model<StakeHistoryAttributes, StakeHistoryCreationAttributes>
  implements StakeHistoryAttributes {
  id!: number;
  member_id!: number;
  stake_id!: number;
  reward_id!: number;
  amount!: number;
  lockup_date!: Date;
  release_date!: Date;
  status!: number;

  reward!: RewardModel;
  stake!: StakeModel;

  static initModel(sequelize: Sequelize.Sequelize): typeof StakeHistoryModel {
    StakeHistoryModel.init(
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
        reward_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        stake_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        amount: {
          type: DataTypes.DECIMAL,
          allowNull: false,
        },
        lockup_date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        release_date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        status: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        tableName: 'history',
        sequelize,
        timestamps: false,
      }
    );

    return StakeHistoryModel;
  }
}
