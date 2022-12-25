import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface child_currenciesAttributes {
  id: number;
  child_id: string;
  parent_id: string;
}

export type child_currenciesPk = "id";
export type child_currenciesId = child_currencies[child_currenciesPk];
export type child_currenciesOptionalAttributes = "id";
export type child_currenciesCreationAttributes = Optional<child_currenciesAttributes, child_currenciesOptionalAttributes>;

export class child_currencies extends Model<child_currenciesAttributes, child_currenciesCreationAttributes> implements child_currenciesAttributes {
  id!: number;
  child_id!: string;
  parent_id!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof child_currencies {
    child_currencies.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    child_id: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    parent_id: {
      type: DataTypes.STRING(10),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'child_currencies',
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
        name: "fk_parent_id",
        using: "BTREE",
        fields: [
          { name: "parent_id" },
        ]
      },
    ]
  });
  return child_currencies;
  }
}
