import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { holdings, holdingsId } from './holdings';

export interface holdersAttributes {
  id: number;
  member_id: number;
  uid: string;
  amount: number;
  status: number;
  created_at: Date;
  updated_at: Date;
}

export type holdersPk = "id";
export type holdersId = holders[holdersPk];
export type holdersOptionalAttributes = "id" | "amount" | "status" | "created_at" | "updated_at";
export type holdersCreationAttributes = Optional<holdersAttributes, holdersOptionalAttributes>;

export class holders extends Model<holdersAttributes, holdersCreationAttributes> implements holdersAttributes {
  id!: number;
  member_id!: number;
  uid!: string;
  amount!: number;
  status!: number;
  created_at!: Date;
  updated_at!: Date;

  // holders hasMany holdings via holder_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof holders {
    holders.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    member_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    uid: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(38,14),
      allowNull: false,
      defaultValue: 0.00000000000000
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'holders',
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
  return holders;
  }
}
