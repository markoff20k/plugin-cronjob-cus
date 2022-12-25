// model
const deposit_model = require("../models/peatio/deposit.model");
const deposit_tracking_model = require("../models/wallet/deposit_tracking.model");
const child_currencies_model = require("../models/wallet/child_currencies.model");
const accounts_model = require("../models/peatio/accounts.model");

const chalk = require("chalk");
const log = console.log;

exports.scanDeposit = async() => {
    try {
        const deposits = await deposit_model.fetch();
        const deposit_tracking_ids = await deposit_tracking_model.fetchDepositIds();
        const child_currencies = await child_currencies_model.fetch();
        const new_tracking_deposits = deposits
            .filter(
                (deposit) =>
                child_currencies
                .map((child) => child.child_id)
                .includes(deposit.currency_id) &&
                !deposit_tracking_ids
                .map((des) => des.deposit_id)
                .includes(deposit.id)
            )
            .map((deposit) => {
                return {
                    ...deposit,
                    deposit_id: deposit.id,
                    parent_currency: child_currencies.find(
                        (child) => child.child_id === deposit.currency_id
                    ).parent_id || "",
                    child_currency: deposit.currency_id,
                };
            });
        if (new_tracking_deposits.length > 0) console.log(new_tracking_deposits);
        for (
            let deposit_index = 0; deposit_index < new_tracking_deposits.length; deposit_index++
        ) {
            const new_deposit = new_tracking_deposits[deposit_index];
            const { deposit_id, member_id, parent_currency, child_currency, amount } =
            new_deposit;

            // get old balance
            const parent_balance = await accounts_model.get_balance(
                member_id,
                parent_currency
            );
            const child_balance = await accounts_model.get_balance(
                member_id,
                child_currency
            );

            if (Number(child_balance) <= 0) {
                console.log(
                    `${child_currency} balance of member_id: ${member_id} is zero`
                );
            } else {
                // update balance
                await accounts_model.plus_balance(member_id, parent_currency, amount);
                await accounts_model.minus_balance(member_id, child_currency, amount);

                // get new balance
                const new_parent_balance = await accounts_model.get_balance(
                    member_id,
                    parent_currency
                );
                const new_child_balance = await accounts_model.get_balance(
                    member_id,
                    child_currency
                );

                // tracking data
                const deposit_tracking = new deposit_tracking_model(
                    deposit_id,
                    member_id,
                    amount,
                    parent_currency,
                    child_currency,
                    parent_balance,
                    child_balance,
                    new_parent_balance,
                    new_child_balance,
                    new Date()
                );
                // save trackings
                await deposit_tracking.save();
            }
        }
    } catch (error) {
        log(chalk.red(error.message));
    }
};