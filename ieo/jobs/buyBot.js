const CronJob = require("cron").CronJob;
const buyBotController = require("../controllers/buyBot");

exports.startIEOCronJob = () => {
  buyBotCronjob = new CronJob(
    "0 */5 * * *",
    buyBotController.autoBuy,
    null,
    true,
    "America/Los_Angeles"
  );
  try {
    buyBotCronjob.start();
  } catch (error) {
    console.log(error);
  }
};
