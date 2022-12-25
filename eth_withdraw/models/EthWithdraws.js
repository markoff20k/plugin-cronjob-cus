const db = require("../database/fee_production");

module.exports = class EthWithdraws {
    constructor(
        withdraw_id,
        member_id,
        currency_id,
        amount,
        eth_fee,
        state,
        created_at
    ) {
        this.withdraw_id = withdraw_id;
        this.member_id = member_id;
        this.currency_id = currency_id;
        this.amount = amount;
        this.eth_fee = eth_fee;
        this.state = state;
        this.created_at = created_at;
    }

    static fetchPendingEthdWithdraws() {
        return db.execute('SELECT withdraw_id, member_id, currency_id, state FROM eth_withdraws WHERE state = 0');
    }

    static fetchFailedWithdraws() {
        return db.execute('SELECT withdraw_id, member_id, currency_id, amount, eth_fee, state FROM eth_withdraws WHERE state = 2');
    }

    static updateState(withdraw_id, member_id, currency_id, state) {
        return db.execute('UPDATE eth_withdraws SET state = ? WHERE withdraw_id = ? and member_id = ? and currency_id = ?', [state, withdraw_id, member_id, currency_id]);
    }

    static getStateOfWithdraw(withdraw_id, member_id, currency_id) {
        return db.execute('SELECT state FROM eth_withdraws WHERE withdraw_id = ? and member_id = ? and currency_id = ?', [withdraw_id, member_id, currency_id]);
    }
};