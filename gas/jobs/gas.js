const CronJob = require("cron").CronJob;
const gasPriceController = require("../controllers/gas");

exports.startGasCronJob = () => {
  gasPriceJob = new CronJob(
    "*/1 * * * *",
    gasPriceController.updateGasPrice,
    null,
    true,
    "America/Los_Angeles"
  );
  try {
    gasPriceJob.start();
  } catch (error) {
    console.log(error);
  }
};
