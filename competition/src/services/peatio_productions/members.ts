import { membersAttributes } from './../../sequelize/models/peatio_production/members';
import { members } from '../../sequelize/models/peatio_production/members';

export const getMemberByMemberID = async (memberID: number) => {
  const member = (
    await members.findOne({
      where: {
        id: memberID,
      },
    })
  )?.toJSON() as membersAttributes;

  return member;
};
