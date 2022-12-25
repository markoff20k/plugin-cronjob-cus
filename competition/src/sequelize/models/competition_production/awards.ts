import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface awardsAttributes {
  id: number;
  competition_id?: number;
  rank?: number;
  prize?: string;
}

export type awardsPk = "id";
export type awardsId = awards[awardsPk];
export type awardsOptionalAttributes = "id" | "competition_id" | "rank" | "prize";
export type awardsCreationAttributes = Optional<awardsAttributes, awardsOptionalAttributes>;

export class awards extends Model<awardsAttributes, awardsCreationAttributes> implements awardsAttributes {
  id!: number;
  competition_id?: number;
  rank?: number;
  prize?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof awards {
    awards.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    competition_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    rank: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    prize: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'awards',
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
  return awards;
  }
}
