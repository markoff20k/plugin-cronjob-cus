import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface currencies_walletsAttributes {
  currency_id?: string;
  wallet_id?: number;
}

export type currencies_walletsOptionalAttributes = "currency_id" | "wallet_id";
export type currencies_walletsCreationAttributes = Optional<currencies_walletsAttributes, currencies_walletsOptionalAttributes>;

export class currencies_wallets extends Model<currencies_walletsAttributes, currencies_walletsCreationAttributes> implements currencies_walletsAttributes {
  currency_id?: string;
  wallet_id?: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof currencies_wallets {
    currencies_wallets.init({
    currency_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    wallet_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'currencies_wallets',
    timestamps: false,
    indexes: [
      {
        name: "index_currencies_wallets_on_currency_id_and_wallet_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "currency_id" },
          { name: "wallet_id" },
        ]
      },
      {
        name: "index_currencies_wallets_on_currency_id",
        using: "BTREE",
        fields: [
          { name: "currency_id" },
        ]
      },
      {
        name: "index_currencies_wallets_on_wallet_id",
        using: "BTREE",
        fields: [
          { name: "wallet_id" },
        ]
      },
    ]
  });
  return currencies_wallets;
  }
}
