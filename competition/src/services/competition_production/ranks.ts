import { ranks } from "../../sequelize/models/competition_production/ranks";

export const isExistRank = async (competitionID: number, member_id: number) => {
  const checked = await ranks.findAndCountAll({
    where: {
      competition_id: competitionID,
      member_id: member_id,
    },
  });
  return checked.count > 0;
};

interface UpdateRankProps {
  volume: number;
  rank: number;
  member_id: number;
  competition_id: number;
}
export const updateRank = async ({
  volume,
  rank,
  member_id,
  competition_id,
}: UpdateRankProps) => {
  await ranks.update(
    {
      volume,
      rank,
    },
    {
      where: {
        member_id,
        competition_id,
      },
    }
  );
};
export const updateVolumn = async (
  competitionID: number,
  member_id: number,
  volume: number
) => {
  await ranks.update(
    {
      volume: volume,
    },
    {
      where: {
        member_id: member_id,
        competition_id: competitionID,
      },
    }
  );
};

export const createRankCompetition = async (
  competition_id: number,
  uid: string,
  email: string,
  member_id: number,
  rank: number,
  volume: number
) => {
  await ranks.create({
    competition_id: competition_id,
    uid: uid,
    email: email,
    volume: volume,
    created_at: new Date(),
    updated_at: new Date(),
    rank: rank,
    member_id: member_id,
  });
};
