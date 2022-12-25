import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ranksAttributes {
  id?: number;
  competition_id: number;
  uid: string;
  email: string;
  member_id: number;
  rank: number;
  volume: number;
  created_at?: Date;
  updated_at?: Date;
}

export type ranksPk = 'id';
export type ranksId = ranks[ranksPk];
export type ranksCreationAttributes = Optional<ranksAttributes, ranksPk>;

export class ranks
  extends Model<ranksAttributes, ranksCreationAttributes>
  implements ranksAttributes
{
  id?: number;
  competition_id!: number;
  uid!: string;
  email!: string;
  member_id!: number;
  rank!: number;
  volume!: number;
  updated_at?: Date;
  created_at?: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof ranks {
    ranks.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          primaryKey: true,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        competition_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        uid: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(255),
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
        volume: {
          type: DataTypes.DECIMAL(10, 0),
          allowNull: false,
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'ranks',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
        ],
      }
    );
    return ranks;
  }
}
