const db = require('../../database/wallet_production');

module.exports = class DepositTracking {
    constructor(
        deposit_id,
        member_id,
        amount,
        parent_currency,
        child_currency,
        parent_balance,
        child_balance,
        new_parent_balance,
        new_child_balance,
        scan_at
    ) {
        this.deposit_id = deposit_id;
        this.member_id = member_id;
        this.amount = amount;
        this.parent_currency = parent_currency;
        this.child_currency = child_currency;
        this.parent_balance = parent_balance;
        this.child_balance = child_balance;
        this.new_parent_balance = new_parent_balance;
        this.new_child_balance = new_child_balance;
        this.scan_at = scan_at;
    }

    async save() {
        try {
            await db.execute(`
                INSERT INTO deposit_tracking
                Values(?,?,?,?,?,?,?,?,?,?)
            `, [
                this.deposit_id,
                this.member_id,
                this.amount,
                this.parent_currency,
                this.child_currency,
                this.parent_balance,
                this.child_balance,
                this.new_parent_balance,
                this.new_child_balance,
                this.scan_at
            ])
        } catch (error) {

        }
    }

    static async fetchDepositIds() {
        try {
            const [deposit_ids] = await db.query(`SELECT deposit_id FROM deposit_tracking`);
            return deposit_ids;
        } catch (error) {
            console.log(error);
            throw error;
        }

    }
}