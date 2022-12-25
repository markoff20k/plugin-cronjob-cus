const db = require('../../database/wallet_production');

module.exports = class ChildCurrenies {
    constructor(
        id,
        child_id,
        parent_id,
    ) {
        this.id = id;
        this.child_id = child_id;
        this.parent_id = parent_id;

    }

    static async fetch() {
        try {
            const [child_currencies] = await db.query("SELECT * FROM child_currencies");
            return child_currencies;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}