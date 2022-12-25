import type { Sequelize, Model } from "sequelize";
import { awards } from "./awards";
import type { awardsAttributes, awardsCreationAttributes } from "./awards";
import { bots } from "./bots";
import type { botsAttributes, botsCreationAttributes } from "./bots";
import { competitions } from "./competitions";
import type { competitionsAttributes, competitionsCreationAttributes } from "./competitions";
import { distribute } from "./distribute";
import type { distributeAttributes, distributeCreationAttributes } from "./distribute";
import { ranks } from "./ranks";
import type { ranksAttributes, ranksCreationAttributes } from "./ranks";

export {
  awards,
  bots,
  competitions,
  distribute,
  ranks,
};

export type {
  awardsAttributes,
  awardsCreationAttributes,
  botsAttributes,
  botsCreationAttributes,
  competitionsAttributes,
  competitionsCreationAttributes,
  distributeAttributes,
  distributeCreationAttributes,
  ranksAttributes,
  ranksCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  awards.initModel(sequelize);
  bots.initModel(sequelize);
  competitions.initModel(sequelize);
  distribute.initModel(sequelize);
  ranks.initModel(sequelize);

  bots.belongsTo(competitions, { as: "competition", foreignKey: "competition_id"});
  competitions.hasMany(bots, { as: "bots", foreignKey: "competition_id"});

  return {
    awards: awards,
    bots: bots,
    competitions: competitions,
    distribute: distribute,
    ranks: ranks,
  };
}
