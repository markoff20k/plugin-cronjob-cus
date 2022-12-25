const db = require('../database/peatio_production');

module.exports = class Accounts {
    constructor(
        id,
        member_id,
        currency_id,
        balance,
        locked,
        created_at,
        updated_at
    ) {
        this.id = id;
        this.member_id = member_id;
        this.currency_id = currency_id;
        this.balance = balance;
        this.locked = locked;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    static updateBallance(member_id, currency_id, balance) {
        return db.execute('UPDATE accounts SET balance = ? WHERE member_id = ? and currency_id = ?', [balance, member_id, currency_id]);
    }

    static getBalanceUser(member_id) {
        return db.execute('SELECT balance FROM accounts where member_id = ? and currency_id = "eth"', [member_id]);
    }

    static getBalanceByCurrencyID(member_id, currency_id) {
        return db.execute('SELECT balance FROM accounts where member_id = ? and currency_id = ?', [member_id, currency_id]);
    }

    static returnETHFee(member_id, fee) {
        return db.execute('UPDATE accounts SET balance = balance + ? WHERE member_id = ? and currency_id = "eth"', [fee, member_id]);
    }
};