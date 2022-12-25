import * as Sequelize from "sequelize";
import moment from "moment";
import { competitions } from "../../sequelize/models/competition_production/competitions";
const Op = Sequelize.Op;

type typeCompetition = "stake" | "trade" | "deposit" | "trade_buy";
export const getCompetitionActive = async (type: typeCompetition) => {
  //gte >=
  //lte <=
  return await competitions.findAll({
    where: {
      start_date: {
        [Op.lte]: moment().toDate(),
      },
      end_date: {
        [Op.gte]: moment().toDate(),
      },
      type: type,
    },
  });
};
export const updateNextDateCompetitionByID = async (
  competitionID: number,
  time: Date
) => {
  return await competitions.update(
    {
      next_update: time,
    },
    {
      where: {
        id: competitionID,
      },
    }
  );
};
