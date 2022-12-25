import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { holders, holdersId } from './holders';
import type { rounds, roundsId } from './rounds';

export interface holdingsAttributes {
  id: number;
  round_id: number;
  holder_id: number;
  day: number;
  amount: number;
}

export type holdingsPk = "id";
export type holdingsId = holdings[holdingsPk];
export type holdingsOptionalAttributes = "id";
export type holdingsCreationAttributes = Optional<holdingsAttributes, holdingsOptionalAttributes>;

export class holdings extends Model<holdingsAttributes, holdingsCreationAttributes> implements holdingsAttributes {
  id!: number;
  round_id!: number;
  holder_id!: number;
  day!: number;
  amount!: number;

  // holdings belongsTo holders via holder_id
  holder!: holders;
  getHolder!: Sequelize.BelongsToGetAssociationMixin<holders>;
  setHolder!: Sequelize.BelongsToSetAssociationMixin<holders, holdersId>;
  createHolder!: Sequelize.BelongsToCreateAssociationMixin<holders>;
  // holdings belongsTo rounds via round_id
  round!: rounds;
  getRound!: Sequelize.BelongsToGetAssociationMixin<rounds>;
  setRound!: Sequelize.BelongsToSetAssociationMixin<rounds, roundsId>;
  createRound!: Sequelize.BelongsToCreateAssociationMixin<rounds>;

  static initModel(sequelize: Sequelize.Sequelize): typeof holdings {
    holdings.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    round_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'rounds',
        key: 'id'
      }
    },
    holder_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'holders',
        key: 'id'
      }
    },
    day: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(38,14),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'holdings',
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
        name: "fk_holdings_round_idx",
        using: "BTREE",
        fields: [
          { name: "round_id" },
        ]
      },
      {
        name: "fk_holdings_holders_idx",
        using: "BTREE",
        fields: [
          { name: "holder_id" },
        ]
      },
    ]
  });
  return holdings;
  }
}
