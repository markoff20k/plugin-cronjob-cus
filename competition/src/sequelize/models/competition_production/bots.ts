import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { competitions, competitionsId } from './competitions';

export interface botsAttributes {
  id: number;
  competition_id: number;
  uid: string;
}

export type botsPk = "id";
export type botsId = bots[botsPk];
export type botsOptionalAttributes = "id";
export type botsCreationAttributes = Optional<botsAttributes, botsOptionalAttributes>;

export class bots extends Model<botsAttributes, botsCreationAttributes> implements botsAttributes {
  id!: number;
  competition_id!: number;
  uid!: string;

  // bots belongsTo competitions via competition_id
  competition!: competitions;
  getCompetition!: Sequelize.BelongsToGetAssociationMixin<competitions>;
  setCompetition!: Sequelize.BelongsToSetAssociationMixin<competitions, competitionsId>;
  createCompetition!: Sequelize.BelongsToCreateAssociationMixin<competitions>;

  static initModel(sequelize: Sequelize.Sequelize): typeof bots {
    bots.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    competition_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'competitions',
        key: 'id'
      }
    },
    uid: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'bots',
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
      {
        name: "fk_bots_competition_id_idx",
        using: "BTREE",
        fields: [
          { name: "competition_id" },
        ]
      },
    ]
  });
  return bots;
  }
}
