const db = require("../../../database/wallet_production");

module.exports = class WithdrawTracking {
    constructor(
        currency_id,
        member_id,
        amount,
        parent_currency,
        child_currency,
        parent_balance,
        child_balance,
        new_parent_balance,
        new_child_balance,
        completed_at
    ) {
        this.currency_id = currency_id;
        this.member_id = member_id;
        this.amount = amount;
        this.parent_currency = parent_currency;
        this.child_currency = child_currency;
        this.parent_balance = parent_balance;
        this.child_balance = child_balance;
        this.new_parent_balance = new_parent_balance;
        this.new_child_balance = new_child_balance;
        this.completed_at = completed_at;
    }

    async save() {
        try {
            await db.execute(
                `
            INSERT INTO withdraw_tracking(currency_id,member_id,amount,parent_currency,child_currency,parent_balance,child_balance,new_parent_balance,new_child_balance,completed_at)
            Values(?,?,?,?,?,?,?,?,?,?)
        `, [
                    this.currency_id,
                    this.member_id,
                    this.amount,
                    this.parent_currency,
                    this.child_currency,
                    this.parent_balance,
                    this.child_balance,
                    this.new_parent_balance,
                    this.new_child_balance,
                    this.completed_at,
                ]
            );
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
};