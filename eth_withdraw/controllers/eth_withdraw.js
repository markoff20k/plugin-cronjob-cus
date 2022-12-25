const AccountsModel = require("../models/Accounts");
const WithdrawsModel = require("../models/Withdraws");

const EthWithdrawsModel = require("../models/EthWithdraws");
const HistoryModel = require("../models/History");

const NP = require('number-precision');

exports.updateWithdrawState = async() => {
    try {
        console.log("[WITHDRAW] Update state eth withdraw");
        const pendingEthWithdraws = await EthWithdrawsModel.fetchPendingEthdWithdraws();
        for await (const pendingWithdraw of pendingEthWithdraws[0]) {
            const withdrawData = await WithdrawsModel.getWithdraw(
                pendingWithdraw.withdraw_id,
                pendingWithdraw.member_id,
                pendingWithdraw.currency_id
            );

            const withdraw = withdrawData[0][0];
            let state;
            switch (withdraw.aasm_state) {
                case "succeed":
                    state = 1;
                    break;
                case "failed":
                    state = 2;
                    break;
                case "rejected":
                    state = 2;
                    break;
                default:
                    state = 0;
                    break;
            }

            await EthWithdrawsModel.updateState(
                withdraw.id,
                withdraw.member_id,
                withdraw.currency_id,
                state
            );
            console.log(
                "Update state: ",
                withdraw.id,
                withdraw.member_id,
                withdraw.currency_id,
                state
            );
        }

        console.log("[WITHDRAW] Return coin");
        const ethWithdraws = await EthWithdrawsModel.fetchFailedWithdraws();
        const returnedFeeList = ethWithdraws[0];
        for await (const withdraw of returnedFeeList) {
            const withdrawEthFee = Number(withdraw.eth_fee);
            await EthWithdrawsModel.updateState(
                withdraw.withdraw_id,
                withdraw.member_id,
                withdraw.currency_id,
                3
            );
            const balance = await AccountsModel.getBalanceUser(withdraw.member_id); // lấy balance cũ của user trước khi trả tiền
            const plusData = new HistoryModel(
                withdraw.member_id,
                withdrawEthFee,
                '+',
                Number(balance[0][0].balance),
                NP.strip(NP.plus(Number(balance[0][0].balance), withdrawEthFee)),
                new Date()
            );
            await plusData.save(); // lưu lịch sử trả tiền.
            await AccountsModel.returnETHFee(withdraw.member_id, NP.strip(withdrawEthFee));
            console.log("Return: ", withdraw.withdraw_id, withdraw.member_id, NP.strip(withdrawEthFee));
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};