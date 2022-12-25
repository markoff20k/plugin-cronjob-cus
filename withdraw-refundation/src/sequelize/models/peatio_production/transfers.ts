import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface transfersAttributes {
  id: number;
  key: string;
  category: number;
  description?: string;
  created_at: Date;
  updated_at: Date;
}

export type transfersPk = "id";
export type transfersId = transfers[transfersPk];
export type transfersOptionalAttributes = "id" | "description";
export type transfersCreationAttributes = Optional<transfersAttributes, transfersOptionalAttributes>;

export class transfers extends Model<transfersAttributes, transfersCreationAttributes> implements transfersAttributes {
  id!: number;
  key!: string;
  category!: number;
  description?: string;
  created_at!: Date;
  updated_at!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof transfers {
    transfers.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    key: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: "index_transfers_on_key"
    },
    category: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ""
    },
    created_at: {
      type: DataTypes.DATE(3),
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE(3),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'transfers',
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
        name: "index_transfers_on_key",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "key" },
        ]
      },
    ]
  });
  return transfers;
  }
}
