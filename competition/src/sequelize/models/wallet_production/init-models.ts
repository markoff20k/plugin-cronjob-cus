import type { Sequelize, Model } from "sequelize";
import { child_currencies } from "./child_currencies";
import type { child_currenciesAttributes, child_currenciesCreationAttributes } from "./child_currencies";

export {
  child_currencies,
};

export type {
  child_currenciesAttributes,
  child_currenciesCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  child_currencies.initModel(sequelize);


  return {
    child_currencies: child_currencies,
  };
}
