const db = require("../database/gas_production");

module.exports = class Currency {
  constructor(currency_id, smart_contract_address, gas_limit, gas_price) {
    this.currency_id = currency_id;
    this.smart_contract_address = smart_contract_address;
    this.gas_limit = gas_limit;
    this.gas_price = gas_price;
  }

  static updateAllGasPrice(gas_price) {
    return db.execute("UPDATE currency SET gas_price = ?", [gas_price]);
  }

  static fetch() {
    return db.execute("SELECT * FROM currency");
  }
};
