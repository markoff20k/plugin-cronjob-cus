import { setUpSequelize } from "./sequelize";
import { CronJob } from "cron";
import { scan } from "./controllers/scan";

try {
  setUpSequelize();
  const refundCronjob = new CronJob(
    "*/1 * * * *",
    scan,
    null,
    true,
    "America/Los_Angeles"
  );
  refundCronjob.start();
} catch (error) {
  console.log(error);
}
