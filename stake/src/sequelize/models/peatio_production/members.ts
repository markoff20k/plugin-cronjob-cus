import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface membersAttributes {
  id: number;
  uid: string;
  email: string;
  level: number;
  role: string;
  group?: string;
  state: string;
  created_at: Date;
  updated_at: Date;
  username?: string;
}

export type membersPk = "id";
export type membersId = members[membersPk];
export type membersCreationAttributes = Optional<membersAttributes, membersPk>;

export class members extends Model<membersAttributes, membersCreationAttributes> implements membersAttributes {
  id!: number;
  uid!: string;
  email!: string;
  level!: number;
  role!: string;
  group?: string;
  state!: string;
  created_at!: Date;
  updated_at!: Date;
  username?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof members {
    members.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    uid: {
      type: DataTypes.STRING(32),
      allowNull: false,
      unique: "index_members_on_uid"
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "index_members_on_email"
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    group: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: "vip-0"
    },
    state: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: "index_members_on_username"
    }
  }, {
    sequelize,
    tableName: 'members',
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
        name: "index_members_on_email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "index_members_on_uid",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "uid" },
        ]
      },
      {
        name: "index_members_on_username",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "username" },
        ]
      },
    ]
  });
  return members;
  }
}
