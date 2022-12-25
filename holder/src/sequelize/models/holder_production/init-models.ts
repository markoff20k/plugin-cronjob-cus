import type { Sequelize, Model } from "sequelize";
import { holders } from "./holders";
import type { holdersAttributes, holdersCreationAttributes } from "./holders";
import { holdings } from "./holdings";
import type { holdingsAttributes, holdingsCreationAttributes } from "./holdings";
import { profits } from "./profits";
import type { profitsAttributes, profitsCreationAttributes } from "./profits";
import { rounds } from "./rounds";
import type { roundsAttributes, roundsCreationAttributes } from "./rounds";

export {
  holders,
  holdings,
  profits,
  rounds,
};

export type {
  holdersAttributes,
  holdersCreationAttributes,
  holdingsAttributes,
  holdingsCreationAttributes,
  profitsAttributes,
  profitsCreationAttributes,
  roundsAttributes,
  roundsCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  holders.initModel(sequelize);
  holdings.initModel(sequelize);
  profits.initModel(sequelize);
  rounds.initModel(sequelize);

  holdings.belongsTo(holders, { as: "holder", foreignKey: "holder_id"});
  holders.hasMany(holdings, { as: "holdings", foreignKey: "holder_id"});
  holdings.belongsTo(rounds, { as: "round", foreignKey: "round_id"});
  rounds.hasMany(holdings, { as: "holdings", foreignKey: "round_id"});

  return {
    holders: holders,
    holdings: holdings,
    profits: profits,
    rounds: rounds,
  };
}
