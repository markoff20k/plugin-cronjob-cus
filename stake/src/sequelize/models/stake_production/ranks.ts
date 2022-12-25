import { Model, DataTypes, Optional } from 'sequelize';
import * as Sequelize from 'sequelize';

export interface RanksAttributes {
  id: string;
  stake_id: number;
  uid: string;
  email: string;
  member_id: string;
  rank: number;
  total_amount: number;
  updated_at: Date;
}

export type RanksCreationAttributes = Optional<RanksAttributes, 'stake_id'>;

export class RanksModel
  extends Model<RanksAttributes, RanksCreationAttributes>
  implements RanksAttributes {
  id!: string;
  stake_id!: number;
  uid!: string;
  email!: string;
  member_id!: string;
  rank!: number;
  total_amount!: number;
  updated_at!: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof RanksModel {
    RanksModel.init(
      {
        id: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true,
        },
        stake_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        uid: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        member_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        rank: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        total_amount: {
          type: DataTypes.DECIMAL,
          allowNull: false,
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        tableName: 'ranks',
        sequelize,
        timestamps: false,
      }
    );

    return RanksModel;
  }
}
