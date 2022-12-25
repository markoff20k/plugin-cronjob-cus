import { mysqlConfig } from '../../../shared';
import { stakeProd } from '../../models';
import { setUpSequelize } from './initial';

export const stakeSequelize = setUpSequelize({
  database: mysqlConfig.stakeDbName,
});

export const stakeModel = stakeProd.initModels(stakeSequelize);

(async () => {
  try {
    await stakeSequelize.authenticate();
    console.log(
      'Connection has been established successfully. - stake_production'
    );
    await stakeSequelize.sync();
  } catch (error) {
    console.error(
      'Unable to connect to the database - stake_production:',
      error
    );
  }
})();
