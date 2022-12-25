import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface schema_migrationsAttributes {
  version: string;
}

export type schema_migrationsPk = "version";
export type schema_migrationsId = schema_migrations[schema_migrationsPk];
export type schema_migrationsOptionalAttributes = "version";
export type schema_migrationsCreationAttributes = Optional<schema_migrationsAttributes, schema_migrationsOptionalAttributes>;

export class schema_migrations extends Model<schema_migrationsAttributes, schema_migrationsCreationAttributes> implements schema_migrationsAttributes {
  version!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof schema_migrations {
    schema_migrations.init({
    version: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'schema_migrations',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "version" },
        ]
      },
    ]
  });
  return schema_migrations;
  }
}
