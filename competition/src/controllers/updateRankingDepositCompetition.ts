import { addMinutes } from "date-fns";
import { toNumber } from "lodash";
import {
  createRankCompetition,
  getCompetitionActive,
  isExistRank,
  updateNextDateCompetitionByID,
  updateRank,
} from "../services";
import {
  getDepositInCompetition,
  getRankingDeposit,
} from "../services/peatio_productions/deposit";
import { getListChildID } from "../services/wallet_production";
const CRONJOB_TIME = 30;

export const updateRankingDeposit = async () => {
  // get competition active
  try {
    const activeCompetitions = await getCompetitionActive("deposit");

    for (
      let competitionIndex = 0;
      competitionIndex < activeCompetitions.length;
      competitionIndex++
    ) {
      const { id, currency_id, start_date, end_date, bot_uid, min_value } =
        activeCompetitions[competitionIndex];
      const botUids = bot_uid
        ? bot_uid
            .replace(/\//g, "")
            .split(",")
            .filter((uid) => uid !== "")
        : []; // ['ID123', 'ID123', ...]
      console.log("competition deposit active :", id);
      const childs = await getListChildID(currency_id);
      console.log("childs deposit active :", childs);

      const deposits = await getDepositInCompetition(
        childs,
        start_date,
        end_date
      );

      const ranking = await getRankingDeposit(deposits, toNumber(min_value));
      // update ranking for database
      for (let index = 0; index < ranking.length; index++) {
        const { member_id, uid, email, total_amount } = ranking[index];

        const existRank = await isExistRank(id, member_id);
        if (existRank) {
          await updateRank({
            competition_id: id,
            member_id: member_id,
            volume: total_amount,
            rank: index + 1,
          });
        } else {
          const isInBotUid = botUids.includes(uid);
          if (!isInBotUid) {
            await createRankCompetition(
              id,
              uid,
              email,
              member_id,
              index + 1,
              total_amount
            );
          }
        }
      }

      await updateNextDateCompetitionByID(
        id,
        addMinutes(new Date(), CRONJOB_TIME)
      );
    }
    console.log("update ranking deposit ranking competition");

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
