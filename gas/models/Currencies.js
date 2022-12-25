const db = require('../database/peatio_production');

module.exports = class Currencies {
    constructor(id,
        name,
        blockchain_key,
        symbol,
        type,
        deposit_fee,
        min_deposit_amount,
        min_collection_amount,
        withdraw_fee,
        min_withdraw_amount,
        withdraw_limit_24h,
        withdraw_limit_72h,
        position,
        options,
        visible,
        deposit_enabled,
        withdrawal_enabled,
        base_factor,
        precision,
        icon_url,
        created_at,
        updated_at
    ) {
        this.id = id;
        this.name = name;
        this.blockchain_key = blockchain_key;
        this.symbol = symbol;
        this.type = type;
        this.deposit_fee = deposit_fee;
        this.min_deposit_amount = min_deposit_amount;
        this.min_collection_amount = min_collection_amount;
        this.withdraw_fee = withdraw_fee;
        this.min_withdraw_amount = min_withdraw_amount;
        this.withdraw_limit_24h = withdraw_limit_24h;
        this.withdraw_limit_72h = withdraw_limit_72h;
        this.position = position;
        this.options = options;
        this.visible = visible;
        this.deposit_enabled = deposit_enabled;
        this.withdrawal_enabled = withdrawal_enabled;
        this.base_factor = base_factor;
        this.precision = precision;
        this.icon_url = icon_url;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    static updateOptions(id, options) {
        return db.execute('Update currencies Set options = ? Where id = ?', [options, id])
    }

    static getDepositFeeById(currency_id) {
        return db.execute('SELECT deposit_fee FROM currencies WHERE id = ?', [currency_id]);
    }

    static fetchCurrencieIds() {
        return db.execute('SELECT id FROM currencies');
    }

    static updateMinCollectionAmount(currency_id, min_collection_amount) {
        return db.execute(`UPDATE currencies SET min_collection_amount = ? WHERE id = ?`, [min_collection_amount, currency_id]);
    }
}