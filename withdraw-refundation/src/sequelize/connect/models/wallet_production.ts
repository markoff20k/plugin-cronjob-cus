import { mysqlConfig } from '../../../shared';
import { walletProd } from '../../models';
import { setUpSequelize } from './initial';

export const walletSequelize = setUpSequelize({
  database: mysqlConfig.walletDbName,
});

export const walletModel = walletProd.initModels(walletSequelize);

(async () => {
  try {
    await walletSequelize.authenticate();
    console.log(
      'Connection has been established successfully. - wallet_production',
    );
  } catch (error) {
    console.error(
      'Unable to connect to the database - wallet_production:',
      error,
    );
  }
})();
