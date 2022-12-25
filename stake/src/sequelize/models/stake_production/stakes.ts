import { RewardModel } from './rewards';
import { Model, DataTypes, Optional } from 'sequelize';
import * as Sequelize from 'sequelize';

export interface StakeAttributes {
  stake_id: number;
  staking_name: string;
  description?: string;
  currency_id: string;
  total_amount: number;
  cap_amount: number;
  min_amount: number;
  cap_amount_per_user: number;
  start_time: Date;
  end_time: Date;
  active: boolean;
  ref_link?: string;
}

export type StakeCreationAttributes = Optional<StakeAttributes, 'stake_id'>;

export class StakeModel
  extends Model<StakeAttributes, StakeCreationAttributes>
  implements StakeAttributes {
  stake_id!: number;
  staking_name!: string;
  description?: string;
  currency_id!: string;
  total_amount!: number;
  cap_amount!: number;
  min_amount!: number;
  cap_amount_per_user!: number;
  start_time!: Date;
  end_time!: Date;
  active!: boolean;
  ref_link?: string;

  rewards!: RewardModel[];

  static initModel(sequelize: Sequelize.Sequelize): typeof StakeModel {
    StakeModel.init(
      {
        stake_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        staking_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        currency_id: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        total_amount: {
          type: DataTypes.DECIMAL,
          allowNull: false,
        },
        cap_amount: {
          type: DataTypes.DECIMAL,
          allowNull: false,
        },
        min_amount: {
          type: DataTypes.DECIMAL,
          allowNull: false,
        },
        cap_amount_per_user: {
          type: DataTypes.DECIMAL,
          allowNull: false,
        },
        start_time: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        end_time: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        ref_link: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
      },
      {
        tableName: 'stakes',
        sequelize,
        timestamps: false,
      }
    );

    return StakeModel;
  }
}
