import { Model, DataTypes, Optional } from 'sequelize';
import * as Sequelize from 'sequelize';
import { StakeModel } from './stakes';

export interface RewardAttributes {
  reward_id: number;
  stake_id: number;
  period: number;
  annual_rate: number;
}

export type RewardCreationAttributes = Optional<RewardAttributes, 'reward_id'>;

export class RewardModel
  extends Model<RewardAttributes, RewardCreationAttributes>
  implements RewardAttributes {
  reward_id!: number;
  stake_id!: number;
  period!: number;
  annual_rate!: number;

  stake!: StakeModel;

  static initModel(sequelize: Sequelize.Sequelize): typeof RewardModel {
    RewardModel.init(
      {
        reward_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        stake_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        period: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        annual_rate: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
      },
      {
        tableName: 'rewards',
        sequelize,
        timestamps: false,
      }
    );

    return RewardModel;
  }
}
