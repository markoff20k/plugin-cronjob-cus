import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface triggersAttributes {
  id: number;
  order_id: number;
  order_type: number;
  value: any;
  state: number;
  created_at: Date;
  updated_at: Date;
}

export type triggersPk = "id";
export type triggersId = triggers[triggersPk];
export type triggersOptionalAttributes = "id" | "state";
export type triggersCreationAttributes = Optional<triggersAttributes, triggersOptionalAttributes>;

export class triggers extends Model<triggersAttributes, triggersCreationAttributes> implements triggersAttributes {
  id!: number;
  order_id!: number;
  order_type!: number;
  value!: any;
  state!: number;
  created_at!: Date;
  updated_at!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof triggers {
    triggers.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    order_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    order_type: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false
    },
    value: {
      type: DataTypes.BLOB,
      allowNull: false
    },
    state: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'triggers',
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
        name: "index_triggers_on_order_id",
        using: "BTREE",
        fields: [
          { name: "order_id" },
        ]
      },
      {
        name: "index_triggers_on_order_type",
        using: "BTREE",
        fields: [
          { name: "order_type" },
        ]
      },
      {
        name: "index_triggers_on_state",
        using: "BTREE",
        fields: [
          { name: "state" },
        ]
      },
    ]
  });
  return triggers;
  }
}
