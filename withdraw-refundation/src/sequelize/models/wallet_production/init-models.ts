import type { Sequelize, Model } from "sequelize";
import { child_currencies } from "./child_currencies";
import type {
  child_currenciesAttributes,
  child_currenciesCreationAttributes,
} from "./child_currencies";
import { refund_tracking } from "./refund_tracking";
import type {
  refund_trackingAttributes,
  refund_trackingCreationAttributes,
} from "./refund_tracking";
import { transfer_tracking } from "./transfer_tracking";
import type {
  transfer_trackingAttributes,
  transfer_trackingCreationAttributes,
} from "./transfer_tracking";

export { child_currencies, refund_tracking, transfer_tracking };

export type {
  child_currenciesAttributes,
  child_currenciesCreationAttributes,
  refund_trackingAttributes,
  refund_trackingCreationAttributes,
  transfer_trackingAttributes,
  transfer_trackingCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  child_currencies.initModel(sequelize);
  refund_tracking.initModel(sequelize);
  transfer_tracking.initModel(sequelize);

  return {
    child_currencies: child_currencies,
    refund_tracking: refund_tracking,
    transfer_tracking: transfer_tracking,
  };
}
