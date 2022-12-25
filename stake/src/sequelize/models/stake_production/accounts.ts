import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface StakeAccountAttributes {
  member_id: number;
  currency_id: string;
  balance: number;
  locked: number;
  created_at: Date;
  updated_at: Date;
}

export type StakeAccountsCreationAttributes = Optional<
  StakeAccountAttributes,
  'member_id'
>;

export class StakeAccountsModel
  extends Model<StakeAccountAttributes, StakeAccountsCreationAttributes>
  implements StakeAccountAttributes {
  member_id!: number;
  currency_id!: string;
  balance!: number;
  locked!: number;
  created_at!: Date;
  updated_at!: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof StakeAccountsModel {
    StakeAccountsModel.init(
      {
        member_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
        },
        currency_id: {
          type: DataTypes.STRING(10),
          allowNull: false,
        },
        balance: {
          type: DataTypes.DECIMAL(32, 16),
          allowNull: false,
          defaultValue: 0.0,
        },
        locked: {
          type: DataTypes.DECIMAL(32, 16),
          allowNull: false,
          defaultValue: 0.0,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'accounts',
        timestamps: false,
      }
    );
    return StakeAccountsModel;
  }
}
