import { historyAttributes } from "./../../sequelize/models/stake_production/history";
import { history } from "../../sequelize/models/stake_production/history";
import * as Sequelize from "sequelize";
import NP from "number-precision";
import { toNumber } from "lodash";
import { getMemberByMemberID } from "..";
import moment from "moment";
export interface MemberInfo {
  member_id: number;
  total_amount: number;
  uid: string;
  email: string;
}
const Op = Sequelize.Op;

export const getMemberInHistoryStake = async (
  stake_id: number,
  start_date: Date,
  end_date: Date
) => {
  return await history.findAll({
    where: {
      lockup_date: {
        [Op.between]: [moment(start_date).toDate(), moment(end_date).toDate()],
      },
      stake_id: stake_id,
    },
  });
};

export const getRanking = async (
  members: historyAttributes[],
  min_value: number
) => {
  const check: Array<number> = [];
  const membersCompetition: MemberInfo[] = [];
  for (let index = 0; index < members.length; index++) {
    const { member_id, amount } = members[index];
    if (!check[member_id]) {
      check[member_id] = 1;
      const { uid, email } = await getMemberByMemberID(member_id);
      membersCompetition.push({
        uid: uid,
        email: email,
        member_id: member_id,
        total_amount: 0,
      });
    }
    const memberIndex = members.findIndex(
      (member) => member.member_id === member_id
    );
    const { total_amount: currentAmount } = membersCompetition[memberIndex];
    membersCompetition[memberIndex].total_amount = NP.plus(
      currentAmount,
      toNumber(amount)
    );
  }
  return membersCompetition
    .filter((item) => item.member_id >= min_value)
    .sort((prev, next) => next.total_amount - prev.total_amount);
};
