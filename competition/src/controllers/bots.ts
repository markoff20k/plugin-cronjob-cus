import { plus } from "number-precision";
import { toNumber } from "lodash";
import NP from "number-precision";
import moment from "moment";
import { Op } from "sequelize";
import { tradingCompetitionModel } from "../sequelize";
NP.enableBoundaryChecking(false);
export const bots = async () => {
  console.log("===== Fake Bots =====");

  const activeCompetitions = await tradingCompetitionModel.competitions.findAll(
    {
      where: {
        start_date: {
          [Op.lte]: moment().toDate(),
        },
        end_date: {
          [Op.gte]: moment().toDate(),
        },
      },
    }
  );

  const activeCompetitionIds: number[] = activeCompetitions.map(
    (competition) => competition.id
  );

  for (let i = 0; i < activeCompetitionIds.length; i++) {
    const competition_id = activeCompetitionIds[i];
    const bots = await tradingCompetitionModel.bots.findAll({
      where: {
        competition_id: competition_id,
      },
    });

    const botUids = bots.map((bot) => bot.uid);
    const list = (await tradingCompetitionModel.ranks.findAll({
      where: { competition_id: competition_id },
    })) || { volume: undefined };
    const userRanks = [...list]
      .filter((l) => !botUids.includes(l.uid))
      .sort((a, b) => b.volume - a.volume);
    const botRanks = [...list]
      .filter((l) => botUids.includes(l.uid))
      .sort((a, b) => b.volume - a.volume);

    const { volume: userMaxVolumn } = userRanks[0] || { volume: 0 };

    const isHigher = botRanks.findIndex(
      (bot) => toNumber(userMaxVolumn) >= toNumber(bot.volume)
    );

    if (isHigher !== -1) {
      const newBotRanks = botRanks
        .map((bot, j) => {
          const { uid, volume } = bot;
          const tVolumn = userMaxVolumn - botRanks[isHigher].volume;
          const tVolumnRandom = Math.random() * tVolumn + tVolumn;
          return {
            uid: uid,
            volume: j >= isHigher ? plus(tVolumnRandom, volume) : volume,
          };
        })
        .sort((a, b) => b.volume - a.volume);

      const rankList = [...newBotRanks, ...userRanks];
      await tradingCompetitionModel.ranks.update(
        { rank: -1 },
        { where: { competition_id: competition_id } }
      );
      for (let j = 0; j < rankList.length; j++) {
        const { uid, volume } = rankList[j];

        await tradingCompetitionModel.ranks.update(
          { rank: j + 1, volume: volume },
          { where: { competition_id: competition_id, uid: uid } }
        );
      }
    }

    // New bots
    const newBots = bots.filter(
      (bot) => !botRanks.map((bot) => bot.uid).includes(bot.uid)
    );
    const newBotsVolumn = newBots.map((bot, index) => {
      const [minPercentRandom, maxPercentRandom] = [0.01, 0.1];
      const randomPercent = Number(
        (
          Math.random() * (maxPercentRandom - minPercentRandom) +
          minPercentRandom
        ).toFixed(4)
      );

      const volumnRandom =
        toNumber(userMaxVolumn) +
        (toNumber(userMaxVolumn) * randomPercent) / (index + 1);
      return {
        uid: bot.uid,
        volume: volumnRandom,
      };
    });

    for (let j = 0; j < newBotsVolumn.length; j++) {
      const { uid, volume } = newBotsVolumn[j];
      await tradingCompetitionModel.ranks.create({
        uid: uid,
        volume: volume,
        rank: j + 1,
        email: "auto@bot.com",
        competition_id: competition_id,
        member_id: 0,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    const newList = (await tradingCompetitionModel.ranks.findAll({
      where: { competition_id: competition_id },
    })) || { volume: undefined };
    const sortList = newList.sort((a, b) => b.volume - a.volume);
    for (let j = 0; j < sortList.length; j++) {
      const { uid, volume } = sortList[j];
      await tradingCompetitionModel.ranks.update(
        { rank: j + 1, volume: volume },
        { where: { competition_id: competition_id, uid: uid } }
      );
    }
  }
  console.log("fake bots successfully");
};
