const db = require('../../database/wallet_production');

module.exports = class RefundTracking {
    constructor(
        withdraw_id,
        member_id,
        refunded_currency,
        refunded_amount,
        refund_at

    ) {
        this.withdraw_id = withdraw_id;
        this.member_id = member_id;
        this.refunded_currency = refunded_currency;
        this.refunded_amount = refunded_amount;
        this.refund_at = refund_at;
    }

    async save() {
        try {
            await db.execute(`
                INSERT INTO refund_tracking(withdraw_id, member_id, refunded_currency,refunded_amount, refund_at)
                Values(?,?,?,?,?)
            `, [this.withdraw_id, this.member_id, this.refunded_currency, this.refunded_amount, new Date()]);
        } catch (error) {
            throw error;
        }
    }

    static async fetchRefunedWithdrawIds() {
        try {
            const [refund_trackings] = await db.query("SELECT withdraw_id FROM refund_tracking");
            return refund_trackings.map(refund_tracking => refund_tracking.withdraw_id);
        } catch (error) {
            throw error;
        }
    }
}