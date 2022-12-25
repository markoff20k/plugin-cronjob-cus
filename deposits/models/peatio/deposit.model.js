const db = require('../../database/peatio_production');

module.exports = class Deposits {
    constructor(
        id,
        member_id,
        currency_id,
        amount,
        fee,
        aasm_state,
        completed_at
    ) {
        this.id = id;
        this.member_id = member_id;
        this.currency_id = currency_id;
        this.amount = amount;
        this.fee = fee;
        this.aasm_state = aasm_state;
        this.completed_at = completed_at;
    }

    static async fetch() {
        try {
            const [deposits] = await db.execute(` SELECT id, member_id, currency_id, amount, txid, completed_at FROM deposits`);
            return deposits;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async fetchFailedDepositsIds() {
        try {
            const [failed_deposits] = await db.execute(` SELECT id FROM deposits WHERE aasm_state = 'failed'`);
            const failed_deposit_ids = failed_deposits.map(dep => dep.id);
            return failed_deposit_ids;
        } catch (error) {
            throw error;
        }
    }
};