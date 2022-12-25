import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface enginesAttributes {
  id: number;
  name: string;
  driver: string;
  uid?: string;
  url?: string;
  key_encrypted?: string;
  secret_encrypted?: string;
  data_encrypted?: string;
  state: number;
}

export type enginesPk = "id";
export type enginesId = engines[enginesPk];
export type enginesOptionalAttributes = "id" | "uid" | "url" | "key_encrypted" | "secret_encrypted" | "data_encrypted" | "state";
export type enginesCreationAttributes = Optional<enginesAttributes, enginesOptionalAttributes>;

export class engines extends Model<enginesAttributes, enginesCreationAttributes> implements enginesAttributes {
  id!: number;
  name!: string;
  driver!: string;
  uid?: string;
  url?: string;
  key_encrypted?: string;
  secret_encrypted?: string;
  data_encrypted?: string;
  state!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof engines {
    engines.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    driver: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    uid: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    key_encrypted: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    secret_encrypted: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    data_encrypted: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    state: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'engines',
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
  return engines;
  }
}
