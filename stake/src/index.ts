import schedule from 'node-schedule';
import { run } from './controllers';
try {
  // cronjob
  schedule.scheduleJob('*/15 * * * *', () => {
    run();
  });
} catch (error) {
  console.log(error);
}
