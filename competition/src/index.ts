import { setUpSequelize } from "./sequelize";
import { CronJob } from "cron";
import { updateRankCompetition } from "./controllers/updateRankingTradingCompetition";
import { updateRankingStake } from "./controllers/updateRankingStakeCompetition";
import { updateRankingDeposit } from "./controllers/updateRankingDepositCompetition";
import { bots } from "./controllers/bots";
import { updateRankTradeBuyCompetition } from "./controllers/updateRankdingTradeBuyCompetition";

async function startJob() {
  console.log("=== Start job =====");
  await updateRankCompetition();
  await updateRankingStake();
  await updateRankingDeposit();
  await updateRankTradeBuyCompetition();
  await bots();
}

(async () => {
  try {
    setUpSequelize();
    setTimeout(() => {
      startJob();
      const updateRankingsJob = new CronJob(
        `0 * * * *`,
        startJob,
        null,
        true,
        "America/Los_Angeles"
      );
      updateRankingsJob.start();
    }, 1000);
  } catch (error) {
    console.log(error);
  }
})();
