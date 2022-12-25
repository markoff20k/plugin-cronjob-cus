import { mysqlConfig } from '../../../shared';
import { holderProd } from '../../models';
import { setUpSequelize } from './initial';

export const holderSequelize = setUpSequelize({
  database: mysqlConfig.holderDbName,
});

export const holderModel = holderProd.initModels(holderSequelize);

(async () => {
  try {
    await holderSequelize.authenticate();
    console.log(
      'Connection has been established successfully. - holder_production',
    );
  } catch (error) {
    console.error(
      'Unable to connect to the database - holder_production:',
      error,
    );
  }
})();
