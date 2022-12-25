import { competitionsAttributes } from "../sequelize/models/competition_production/competitions";
import {
  createRankCompetition,
  isExistRank,
  updateVolumn,
  getCompetitionActive,
  updateNextDateCompetitionByID,
  getListMemberByTrades,
  getTradeValid,
  getMemberByMemberID,
  updateRank,
} from "../services";

import { addMinutes } from "date-fns";
import { toNumber } from "lodash";
import { tradingCompetitionModel } from "../sequelize";

export const updateRankCompetition = async () => {
  console.log(">>>>>>>>> : Update Trading Competitions Ranks Running");
  try {
    const cronjob_time = 30;
    const competitionsActive = await getCompetitionActive("trade");
    for (
      let competitionIndex = 0;
      competitionIndex < competitionsActive.length;
      competitionIndex++
    ) {
      const { id, market_ids, start_date, end_date, bot_uid, min_value } =
        competitionsActive[competitionIndex] as competitionsAttributes;

      console.log("Competition trade CronJOB : ", id);
      if (!market_ids) {
        throw new Error("market_ids invalid");
      }
      const marketIDConverted = market_ids.replace(/\//g, "").split(","); // ['escusdt', 'esceth', ...]
      const botUids = bot_uid
        ? bot_uid
            .replace(/\//g, "")
            .split(",")
            .filter((uid) => uid !== "")
        : []; // ['ID123', 'ID123', ...]

      // get competition of trade valid
      const tradesValid = await getTradeValid(
        start_date,
        end_date,
        marketIDConverted
      );
      // get listing member join of trade and plus amount -> ranking
      const listMember = getListMemberByTrades(
        tradesValid,
        toNumber(min_value)
      );

      // update ranking to database
      for (let index = 0; index < listMember.length; index++) {
        const { member_id, volume } = listMember[index];
        console.log(member_id);

        if (member_id !== 0) {
          const existRank = await isExistRank(id, member_id);
          if (existRank) {
            await updateRank({
              competition_id: id,
              member_id: member_id,
              volume: volume,
              rank: index + 1,
            });
          } else {
            const { email, uid } = await getMemberByMemberID(member_id);
            const isInBotUid = botUids.includes(uid);
            if (!isInBotUid) {
              await createRankCompetition(
                id,
                uid,
                email,
                member_id,
                index + 1,
                volume
              );
            }
          }
        }
      }
      await updateNextDateCompetitionByID(
        id,
        addMinutes(new Date(), cronjob_time)
      );
    }
    console.log("update trade competitions success");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
