import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ar_internal_metadataAttributes {
  key: string;
  value?: string;
  created_at: Date;
  updated_at: Date;
}

export type ar_internal_metadataPk = "key";
export type ar_internal_metadataId = ar_internal_metadata[ar_internal_metadataPk];
export type ar_internal_metadataOptionalAttributes = "key" | "value";
export type ar_internal_metadataCreationAttributes = Optional<ar_internal_metadataAttributes, ar_internal_metadataOptionalAttributes>;

export class ar_internal_metadata extends Model<ar_internal_metadataAttributes, ar_internal_metadataCreationAttributes> implements ar_internal_metadataAttributes {
  key!: string;
  value?: string;
  created_at!: Date;
  updated_at!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof ar_internal_metadata {
    ar_internal_metadata.init({
    key: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    value: {
      type: DataTypes.STRING(255),
      allowNull: true
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
    tableName: 'ar_internal_metadata',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "key" },
        ]
      },
    ]
  });
  return ar_internal_metadata;
  }
}
