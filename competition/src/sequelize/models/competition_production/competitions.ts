import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import type { bots, botsId } from "./bots";

export interface competitionsAttributes {
  id: number;
  bot_uid?: string;
  currency_id: string;
  type: string;
  currency_image?: string;
  total_prize?: string;
  market_ids?: string;
  next_update?: Date;
  start_date: Date;
  end_date: Date;
  min_value?: number;
  limit_display?: string;
}

export type competitionsPk = "id";
export type competitionsId = competitions[competitionsPk];
export type competitionsOptionalAttributes =
  | "id"
  | "bot_uid"
  | "currency_image"
  | "total_prize"
  | "market_ids"
  | "next_update"
  | "limit_display";
export type competitionsCreationAttributes = Optional<
  competitionsAttributes,
  competitionsOptionalAttributes
>;

export class competitions
  extends Model<competitionsAttributes, competitionsCreationAttributes>
  implements competitionsAttributes
{
  id!: number;
  bot_uid?: string;
  currency_id!: string;
  type!: string;
  currency_image?: string;
  total_prize?: string;
  market_ids?: string;
  next_update?: Date;
  start_date!: Date;
  end_date!: Date;
  min_value?: number;
  limit_display?: string;

  // competitions hasMany bots via competition_id
  bots!: bots[];
  getBots!: Sequelize.HasManyGetAssociationsMixin<bots>;
  setBots!: Sequelize.HasManySetAssociationsMixin<bots, botsId>;
  addBot!: Sequelize.HasManyAddAssociationMixin<bots, botsId>;
  addBots!: Sequelize.HasManyAddAssociationsMixin<bots, botsId>;
  createBot!: Sequelize.HasManyCreateAssociationMixin<bots>;
  removeBot!: Sequelize.HasManyRemoveAssociationMixin<bots, botsId>;
  removeBots!: Sequelize.HasManyRemoveAssociationsMixin<bots, botsId>;
  hasBot!: Sequelize.HasManyHasAssociationMixin<bots, botsId>;
  hasBots!: Sequelize.HasManyHasAssociationsMixin<bots, botsId>;
  countBots!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof competitions {
    competitions.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        bot_uid: {
          type: DataTypes.STRING(500),
          allowNull: true,
        },
        currency_id: {
          type: DataTypes.STRING(10),
          allowNull: false,
        },
        type: {
          type: DataTypes.STRING(10),
          allowNull: false,
        },
        currency_image: {
          type: DataTypes.STRING(400),
          allowNull: true,
        },
        total_prize: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        market_ids: {
          type: DataTypes.STRING(300),
          allowNull: true,
        },
        next_update: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        start_date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        end_date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        min_value: {
          type: DataTypes.DECIMAL(32, 16),
          allowNull: false,
        },
        limit_display: {
          type: DataTypes.STRING(400),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "competitions",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
        ],
      }
    );
    return competitions;
  }
}
