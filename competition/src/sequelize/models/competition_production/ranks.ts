import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ranksAttributes {
  id: number;
  competition_id: number;
  uid: string;
  email: string;
  member_id: number;
  rank: number;
  volume: number;
  created_at?: Date;
  updated_at?: Date;
}

export type ranksPk = "id" | "rank";
export type ranksId = ranks[ranksPk];
export type ranksOptionalAttributes = "id" | "rank" | "created_at" | "updated_at";
export type ranksCreationAttributes = Optional<ranksAttributes, ranksOptionalAttributes>;

export class ranks extends Model<ranksAttributes, ranksCreationAttributes> implements ranksAttributes {
  id!: number;
  competition_id!: number;
  uid!: string;
  email!: string;
  member_id!: number;
  rank!: number;
  volume!: number;
  created_at?: Date;
  updated_at?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof ranks {
    ranks.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    competition_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    uid: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    member_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rank: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    volume: {
      type: DataTypes.DECIMAL(32,16),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ranks',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
          { name: "rank" },
        ]
      },
    ]
  });
  return ranks;
  }
}
