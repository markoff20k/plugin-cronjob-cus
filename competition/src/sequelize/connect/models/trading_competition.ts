import { mysqlConfig } from "../../../shared";
import { competitionProd } from "../../models";
import { setUpSequelize } from "./initial";

export const tradingCompetitionSequelize = setUpSequelize({
  database: mysqlConfig.competitionDbName,
});

export const tradingCompetitionModel = competitionProd.initModels(
  tradingCompetitionSequelize
);

(async () => {
  try {
    await tradingCompetitionSequelize.authenticate();
    console.log(
      "Connection has been established successfully. - competition_production"
    );
  } catch (error) {
    console.error(
      "Unable to connect to the database - competition_production",
      error
    );
  }
})();
