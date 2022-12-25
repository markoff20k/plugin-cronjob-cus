import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { holdings, holdingsId } from './holdings';

export interface roundsAttributes {
  id: number;
  name?: string;
  start_time: Date;
  end_time: Date;
}

export type roundsPk = "id";
export type roundsId = rounds[roundsPk];
export type roundsOptionalAttributes = "id" | "name";
export type roundsCreationAttributes = Optional<roundsAttributes, roundsOptionalAttributes>;

export class rounds extends Model<roundsAttributes, roundsCreationAttributes> implements roundsAttributes {
  id!: number;
  name?: string;
  start_time!: Date;
  end_time!: Date;

  // rounds hasMany holdings via round_id
  holdings!: holdings[];
  getHoldings!: Sequelize.HasManyGetAssociationsMixin<holdings>;
  setHoldings!: Sequelize.HasManySetAssociationsMixin<holdings, holdingsId>;
  addHolding!: Sequelize.HasManyAddAssociationMixin<holdings, holdingsId>;
  addHoldings!: Sequelize.HasManyAddAssociationsMixin<holdings, holdingsId>;
  createHolding!: Sequelize.HasManyCreateAssociationMixin<holdings>;
  removeHolding!: Sequelize.HasManyRemoveAssociationMixin<holdings, holdingsId>;
  removeHoldings!: Sequelize.HasManyRemoveAssociationsMixin<holdings, holdingsId>;
  hasHolding!: Sequelize.HasManyHasAssociationMixin<holdings, holdingsId>;
  hasHoldings!: Sequelize.HasManyHasAssociationsMixin<holdings, holdingsId>;
  countHoldings!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof rounds {
    rounds.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'rounds',
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
  return rounds;
  }
}
