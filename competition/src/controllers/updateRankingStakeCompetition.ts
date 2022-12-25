import { historyAttributes } from "./../sequelize/models/stake_production/history";
import {
  getCompetitionActive,
  updateNextDateCompetitionByID,
  getMemberInHistoryStake,
  getRanking,
  getStakesByCurrencyID,
  isExistRank,
  updateVolumn,
  createRankCompetition,
  updateRank,
} from "../services";

import { addMinutes } from "date-fns";
import { toNumber } from "lodash";
import { tradingCompetitionModel } from "../sequelize";

export const updateRankingStake = async () => {
  // get competition active
  const cronjob_time = 30;
  try {
    console.log(">>>>>>> : update ranking stake");
    const activeCompetition = await getCompetitionActive("stake");

    for (
      let competitionIndex = 0;
      competitionIndex < activeCompetition.length;
      competitionIndex++
    ) {
      const { id, currency_id, start_date, end_date, bot_uid, min_value } =
        activeCompetition[competitionIndex];
      console.log("competition stake active", id);
      const competitionStakes = await getStakesByCurrencyID(currency_id);
      const botUids = bot_uid
        ? bot_uid
            .replace(/\//g, "")
            .split(",")
            .filter((uid) => uid !== "")
        : []; // ['ID123', 'ID123', ...]
      // get listing member  stake in competition of history
      let memberInCompetition: historyAttributes[] = [];
      for (const stake of competitionStakes) {
        const { stake_id } = stake;
        const listMember = await getMemberInHistoryStake(
          stake_id,
          start_date,
          end_date
        );
        memberInCompetition = [...memberInCompetition, ...listMember];
      }
      // => filter and plus amount -> ranking
      const ranking = await getRanking(
        memberInCompetition,
        toNumber(min_value)
      );

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
        addMinutes(new Date(), cronjob_time)
      );
    }

    console.log("update stake ranking success");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
