import NP from "number-precision";
import {
  trades,
  tradesAttributes,
} from "../../sequelize/models/peatio_production/trades";
import * as Sequelize from "sequelize";
import { toNumber } from "lodash";
import moment from "moment";
const Op = Sequelize.Op;
export const getTradeValid = async (
  startDate: Date,
  endDate: Date,
  marketIDConverted: Array<string>
) => {
  return await trades.findAll({
    where: {
      created_at: {
        [Op.between]: [moment(startDate).toDate(), moment(endDate).toDate()],
      },
      market_id: {
        [Op.in]: marketIDConverted,
      },
    },
  });
};

interface memberInfo {
  member_id: number;
  volume: number;
}
export const getListMemberByTrades = (
  trades: Array<tradesAttributes>,
  min_value: number
) => {
  const check: number[] = [];
  let listMemberInfo: memberInfo[] = [];

  trades.forEach((trade) => {
    if (!check[trade.maker_id]) {
      check[trade.maker_id] = 1;
      listMemberInfo = [
        ...listMemberInfo,
        {
          member_id: trade.maker_id,
          volume: 0,
        },
      ];
    }
    if (!check[trade.taker_id]) {
      check[trade.taker_id] = 1;
      listMemberInfo = [
        ...listMemberInfo,
        {
          member_id: trade.taker_id,
          volume: 0,
        },
      ];
    }
    //Plus Amount
    const makerIndex = listMemberInfo.findIndex(
      (member) => member.member_id === trade.maker_id
    );
    const takerIndex = listMemberInfo.findIndex(
      (member) => member.member_id === trade.taker_id
    );
    listMemberInfo[makerIndex].volume = NP.plus(
      toNumber(listMemberInfo[makerIndex].volume),
      toNumber(trade.amount)
    );
    listMemberInfo[takerIndex].volume = NP.plus(
      toNumber(listMemberInfo[takerIndex].volume),
      toNumber(trade.amount)
    );
  });

  return listMemberInfo
    // .filter((item) => item.volume >= min_value)
    .sort((prev, next) => next.volume - prev.volume);
};


export const getListMemberBuyTrade = (trades: Array<tradesAttributes>,
  min_value: number) => {
  const check: number[] = [];
  let listMemberInfo: memberInfo[] = [];
  for (let index = 0; index < trades.length; index++) {
    const trade = trades[index];
    if (!check[trade.maker_id]) {
      check[trade.maker_id] = 1;
      listMemberInfo = [
        ...listMemberInfo,
        {
          member_id: trade.maker_id,
          volume: 0,
        },
      ];
    }
    if (!check[trade.taker_id]) {
      check[trade.taker_id] = 1;
      listMemberInfo = [
        ...listMemberInfo,
        {
          member_id: trade.taker_id,
          volume: 0,
        },
      ];
    }
    if (trade.taker_type === 'buy') {
      const takerIndex = listMemberInfo.findIndex(
        (member) => member.member_id === trade.taker_id
      );
      listMemberInfo[takerIndex].volume = NP.plus(
        toNumber(listMemberInfo[takerIndex].volume),
        toNumber(trade.amount)
      );
    }
    else {
      const makerIndex = listMemberInfo.findIndex(
        (member) => member.member_id === trade.maker_id
      );
      listMemberInfo[makerIndex].volume = NP.plus(
        toNumber(listMemberInfo[makerIndex].volume),
        toNumber(trade.amount)
      );
    }
  }

  return listMemberInfo
    // .filter((item) => item.volume >= min_value)
    .sort((prev, next) => next.volume - prev.volume);
}