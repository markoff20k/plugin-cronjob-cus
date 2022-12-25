const CronJob = require('cron').CronJob;
const depositController = require('../controllers/deposit.controller');

exports.startDepositCronjob = () => {
    depositJob = new CronJob(
        `*/5 * * * *`,
        depositController.scanDeposit,
        null,
        true,
        'America/Los_Angeles');
    try {
        depositJob.start();
    } catch (error) {
        console.log(error);
    }
}