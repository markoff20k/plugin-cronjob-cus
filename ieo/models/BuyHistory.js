const db = require('../database/ieo_production');

module.exports = class BuyHistory {
    constructor(
        ieo_id,
        uid,
        member_id,
        quantity,
        base_currency,
        total,
        quote_currency,
        status,
        created_at
    ) {
        this.ieo_id = ieo_id;
        this.uid = uid;
        this.member_id = member_id;
        this.quantity = quantity;
        this.base_currency = base_currency;
        this.total = total;
        this.quote_currency = quote_currency;
        this.status = status;
        this.created_at = created_at;
    }

    save() {
        return db.execute(`
            INSERT INTO buy_history (
                ieo_id,
                uid,
                member_id,
                quantity,
                base_currency,
                total,
                quote_currency,
                status,
                created_at
            )
            Values (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            this.ieo_id,
            this.uid,
            this.member_id,
            this.quantity,
            this.base_currency,
            this.total,
            this.quote_currency,
            this.status,
            this.created_at
        ]);
    }

};