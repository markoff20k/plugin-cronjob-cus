import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface jobsAttributes {
  id: number;
  name: string;
  pointer?: number;
  counter?: number;
  data?: object;
  error_code: number;
  error_message?: string;
  started_at?: Date;
  finished_at?: Date;
}

export type jobsPk = "id";
export type jobsId = jobs[jobsPk];
export type jobsOptionalAttributes = "id" | "pointer" | "counter" | "data" | "error_code" | "error_message" | "started_at" | "finished_at";
export type jobsCreationAttributes = Optional<jobsAttributes, jobsOptionalAttributes>;

export class jobs extends Model<jobsAttributes, jobsCreationAttributes> implements jobsAttributes {
  id!: number;
  name!: string;
  pointer?: number;
  counter?: number;
  data?: object;
  error_code!: number;
  error_message?: string;
  started_at?: Date;
  finished_at?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof jobs {
    jobs.init({
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
    pointer: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    counter: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    data: {
      type: DataTypes.JSON,
      allowNull: true
    },
    error_code: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 255
    },
    error_message: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    started_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    finished_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'jobs',
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
  return jobs;
  }
}
