import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface beneficiariesAttributes {
  id: number;
  member_id: number;
  currency_id: string;
  name: string;
  description?: string;
  data_encrypted?: string;
  pin: number;
  sent_at?: Date;
  state: number;
  created_at: Date;
  updated_at: Date;
}

export type beneficiariesPk = "id";
export type beneficiariesId = beneficiaries[beneficiariesPk];
export type beneficiariesOptionalAttributes = "id" | "description" | "data_encrypted" | "sent_at" | "state";
export type beneficiariesCreationAttributes = Optional<beneficiariesAttributes, beneficiariesOptionalAttributes>;

export class beneficiaries extends Model<beneficiariesAttributes, beneficiariesCreationAttributes> implements beneficiariesAttributes {
  id!: number;
  member_id!: number;
  currency_id!: string;
  name!: string;
  description?: string;
  data_encrypted?: string;
  pin!: number;
  sent_at?: Date;
  state!: number;
  created_at!: Date;
  updated_at!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof beneficiaries {
    beneficiaries.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    member_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    currency_id: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ""
    },
    data_encrypted: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    pin: {
      type: DataTypes.MEDIUMINT.UNSIGNED,
      allowNull: false
    },
    sent_at: {
      type: DataTypes.DATE,
      allowNull: true
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
    tableName: 'beneficiaries',
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
        name: "index_beneficiaries_on_member_id",
        using: "BTREE",
        fields: [
          { name: "member_id" },
        ]
      },
      {
        name: "index_beneficiaries_on_currency_id",
        using: "BTREE",
        fields: [
          { name: "currency_id" },
        ]
      },
    ]
  });
  return beneficiaries;
  }
}
