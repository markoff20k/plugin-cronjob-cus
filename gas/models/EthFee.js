const db = require("../database/fee_production");

module.exports = class EthFee {
  constructor(fee) {
    this.fee = fee;
  }

  static updateEthFee(fee) {
    return db.execute("Update eth_fee Set fee = ?", [fee]);
  }
};
