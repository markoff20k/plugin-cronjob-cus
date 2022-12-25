import { plus } from "number-precision";
import { transfer_trackingAttributes } from "./../sequelize/models/wallet_production/transfer_tracking";
import { walletModel } from "../sequelize/connect/models/wallet_production";
import { peatioModel } from "../sequelize";
import { withdrawsAttributes } from "../sequelize/models/peatio_production/withdraws";

export const scan = async () => {
  try {
    const pendingTransfers = await walletModel.transfer_tracking.findAll({
      where: { status: "waiting" },
    });

    const fails = [];
    for (let i = 0; i < pendingTransfers.length; i++) {
      const transfer = pendingTransfers[
        i
      ].toJSON() as transfer_trackingAttributes;
      const {
        id,
        withdraw_id,
        parent_currency,
        child_currency,
        amount,
        member_id,
      } = transfer;

      if (!withdraw_id) {
        fails.push({ ...transfer, errors: ["Withdraw-ID is missing"] });
      } else {
        const withdraw = await peatioModel.withdraws.findOne({
          where: { id: withdraw_id },
        });

        if (!withdraw) {
          fails.push({ ...transfer, errors: ["Withdraw is not found"] });
        } else {
          const { aasm_state } = withdraw.toJSON() as withdrawsAttributes;
          if (aasm_state === "failed" || aasm_state === "rejected") {
            await peatioModel.accounts.increment(
              { balance: +amount },
              { where: { member_id: member_id, currency_id: parent_currency } }
            );
            await peatioModel.accounts.increment(
              { balance: -amount },
              { where: { member_id: member_id, currency_id: child_currency } }
            );

            await walletModel.refund_tracking.create({
              member_id: member_id,
              refunded_currency: parent_currency,
              refunded_amount: amount,
              withdraw_id: withdraw_id,
              refund_at: new Date(),
            });
            await walletModel.transfer_tracking.update(
              { status: "refuned-failed-admin" },
              { where: { id: id } }
            );
            console.log("Refunded", transfer);
          } else if (aasm_state === "succeed") {
            await walletModel.transfer_tracking.update(
              { status: "succeed" },
              { where: { id: id } }
            );
          }
        }
      }
    }
    if (fails.length) console.log("Fails: ", fails);
  } catch (error) {
    console.log(error);
  }
};
