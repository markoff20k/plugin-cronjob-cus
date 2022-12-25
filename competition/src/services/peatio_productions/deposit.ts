import moment from "moment";
import NP from "number-precision";
import {
  deposits,
  depositsAttributes,
} from "../../sequelize/models/peatio_production/deposits";
import * as Sequelize from "sequelize";
import { getMemberByMemberID } from ".";
import { MemberInfo } from "..";
import { toNumber } from "lodash";
const Op = Sequelize.Op;
export const getDepositInCompetition = async (
  childs: string[],
  start_date: Date,
  end_date: Date
) => {
  console.log(childs.includes("ltc"));

  const listDeposit = await deposits.findAll({
    where: {
      created_at: {
        [Op.between]: [start_date, end_date],
      },
      currency_id: {
        [Op.in]: childs,
      },
    },
  });
  return listDeposit.map((dep) => dep.toJSON() as depositsAttributes);
};

export const getRankingDeposit = async (
  deposits: depositsAttributes[],
  min_value: number
) => {
  const check: {
    [id: number]: number;
  } = {};
  const list: MemberInfo[] = [];
  for (const dep of deposits) {
    if (!check[dep.member_id]) {
      check[dep.member_id] = 1;
      const { uid, email } = await getMemberByMemberID(dep.member_id);
      list.push({
        member_id: dep.member_id,
        email: email,
        total_amount: 0,
        uid: uid,
      });
    }
    const memberIndex = list.findIndex(
      (member) => toNumber(member.member_id) === toNumber(dep.member_id)
    );
    const oldAmount = list[memberIndex].total_amount;
    list[memberIndex].total_amount = NP.plus(oldAmount, Number(dep.amount));
  }
  return list
    .filter((item) => item.total_amount >= min_value)
    .sort((prev, next) => next.total_amount - prev.total_amount);
};
