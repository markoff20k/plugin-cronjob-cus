const db = require("../database/gas_production");

module.exports = class GasPrice {
  constructor(id, price) {
    this.id = id;
    this.price = price;
  }

  updatePrice() {
    return db.execute("UPDATE gas_price SET price = ? WHERE id = ?", [
      this.price,
      this.id,
    ]);
  }

  static fetch() {
    return db.execute("SELECT * FROM gas_price");
  }
};
