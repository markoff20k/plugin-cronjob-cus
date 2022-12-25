const db = require("../database/gas_production");

module.exports = class CurrencyOption {
  constructor(id, currency_id, options) {
    this.id = id;
    this.currency_id = currency_id;
    this.options = options;
  }

  static fetchOptions() {
    return db.execute("SELECT currency_id, options FROM currency_option");
  }

  static updateOptions(currency_id, options) {
    return db.execute(
      "UPDATE currency_option SET options = ? WHERE currency_id = ?",
      [options, currency_id]
    );
  }
};
