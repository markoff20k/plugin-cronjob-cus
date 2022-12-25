const db = require("../database/gas_production");

module.exports = class MinCollection {
  constructor(currency_id, from, to, min_collection_amount) {
    this.currency_id = currency_id;
    this.from = from;
    this.to = to;
    this.min_collection_amount = min_collection_amount;
  }

  static fetchMinCollectionAmount(currency_id, gas_price) {
    return db.execute(
      "SELECT min_collection_amount FROM min_collection WHERE currency_id = ? AND `from` <= ? AND `to` >= ?",
      [currency_id, gas_price, gas_price]
    );
  }

  save() {
    return db.execute(
      "INSERT INTO min_collection(currency_id,`from`,`to`,min_collection_amount) Values(?,?,?,?)",
      [this.currency_id, this.from, this.to, this.min_collection_amount]
    );
  }
};
