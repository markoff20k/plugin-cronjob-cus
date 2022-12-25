import { setUpSequelize } from "./sequelize";
import { CronJob } from "cron";

import { scan } from "./controllers/scan";
import { calProfit } from "./controllers/profit";
import { scanHoldings } from "./controllers/holdings";

try {
  setUpSequelize();

  setTimeout(async () => {
    // await scan();
    // await calProfit();
    await scanHoldings();
  }, 3000);

  // const scanHoldersCronjob = new CronJob(
  //   "*/15 * * * *",
  //   scan,
  //   null,
  //   true,
  //   "America/Los_Angeles"
  // );

  // scanHoldersCronjob.start();
} catch (error) {
  console.log(error);
}
