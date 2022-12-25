const CronJob = require("cron").CronJob;
const withdrawController = require("../controllers/eth_withdraw");

let updateWithdrawStateJob;

exports.startWithdrawCronJob = () => {
    updateWithdrawStateJob = new CronJob(
        "*/1 * * * *",
        withdrawController.updateWithdrawState,
        null,
        true,
        "America/Los_Angeles"
    );
    try {
        updateWithdrawStateJob.start();
    } catch (error) {
        console.log(error);
    }
};