const db = require('../../database/peatio_production');

module.exports = class Accounts {
    constructor(
        member_id,
        currency_id,
        balance,
        locked,
        created_at,
        updated_at
    ) {
        this.member_id = member_id;
        this.currency_id = currency_id;
        this.balance = balance;
        this.locked = locked;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    async save() {
        try {
            await db.execute(`
                INSERT INTO accounts(member_id,currency_id,balance,locked,created_at,updated_at)
                Values(?,?,?,?,?,?)
            `, [this.member_id, this.currency_id, this.balance, this.locked, this.created_at, this.updated_at]);
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    static async get_balance(member_id, currency_id) {
        try {
            const [account] = await db.query("SELECT balance FROM accounts WHERE member_id = ? AND currency_id = ?", [member_id, currency_id]);
            if (!account[0]) {
                await db.execute(`
                INSERT INTO accounts(member_id,currency_id,balance,locked,created_at,updated_at)
                Values(?,?,?,?,?,?)
            `, [member_id, currency_id, 0, 0, new Date(), new Date()]);
            }
            return account && account[0] ? account[0].balance : 0;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    static async plus_balance(member_id, currency_id, amount) {
        try {
            await db.execute('UPDATE accounts SET balance = balance + ? WHERE member_id = ? AND currency_id = ?', [amount, member_id, currency_id]);
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    static async minus_balance(member_id, currency_id, amount) {
        try {
            await db.execute('UPDATE accounts SET balance = balance - ? WHERE member_id = ? AND currency_id = ?', [amount, member_id, currency_id]);
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

};