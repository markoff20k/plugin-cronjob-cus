import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface distributeAttributes {
  id: number;
  competition_id?: number;
  uid?: string;
  currency_id?: string;
  bonus?: number;
  distribute_at?: Date;
}

export type distributePk = "id";
export type distributeId = distribute[distributePk];
export type distributeOptionalAttributes = "id" | "competition_id" | "uid" | "currency_id" | "bonus" | "distribute_at";
export type distributeCreationAttributes = Optional<distributeAttributes, distributeOptionalAttributes>;

export class distribute extends Model<distributeAttributes, distributeCreationAttributes> implements distributeAttributes {
  id!: number;
  competition_id?: number;
  uid?: string;
  currency_id?: string;
  bonus?: number;
  distribute_at?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof distribute {
    distribute.init({
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
    uid: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    currency_id: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    bonus: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    distribute_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'distribute',
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
  return distribute;
  }
}
