import { Op } from "sequelize";
import NP, { divide, plus, times } from "number-precision";
import axios from "axios";
import { holderModel, peatioModel } from "../sequelize";
import { toLower } from "lodash";
import moment from "moment";
NP.enableBoundaryChecking(false);
const base_price = 0.0005;
const DEFAULT_CONVERTED_CURRENCY = "usdt";
const BASE_URL = "www.cx.finance";
const exceptCurrencies = ["busd-bep20"];

export const getPrice = async (currency_id: string) => {
  try {
    if (exceptCurrencies.includes(toLower(currency_id))) return 1;

    console.log(currency_id);

    const api = `https://${BASE_URL}/api/v2/peatio/public/markets/${currency_id}${DEFAULT_CONVERTED_CURRENCY}/tickers`;
    console.log(api);
    
    const price = await axios.get(api);
    const quote_price = Number(price.data.ticker.last);
    return NP.times(base_price, quote_price);
  } catch (error) {
    return undefined;
  }
};

const calculateDepositProfit = async () => {
  try {
    const deposits = await peatioModel.deposits.findAll({
      where: { aasm_state: "collected" },
      attributes: ["currency_id", "amount", "fee"],
    });
    console.table(deposits);

    let depositProfitTotal = 0;
    for await (const deposit of deposits) {
      const { currency_id, amount, fee } = deposit;
      const convertedPrice = await getPrice(toLower(currency_id));
      if (convertedPrice) {
        const profit = NP.times(amount, divide(fee, 100), convertedPrice);
        depositProfitTotal = NP.plus(depositProfitTotal, profit);
      }
    }

    return depositProfitTotal;
  } catch (error) {
    console.log("Fail calculate [DEPOSIT] profit: ");
    return 0;
  }
};

const calculateWithdrawProfit = async () => {
  try {
    const withdraws = await peatioModel.withdraws.findAll({
      where: { aasm_state: "succeed" },
      attributes: ["currency_id", "amount", "fee"],
    });
    let withdrawProfitTotal = 0;

    for await (const withdraw of withdraws) {
      const { currency_id, fee } = withdraw;
      const convertedPrice = await getPrice(toLower(currency_id));
      if (convertedPrice) {
        const profit = NP.times(fee, convertedPrice);
        withdrawProfitTotal = NP.plus(withdrawProfitTotal, profit);
      }
    }
    console.log(withdrawProfitTotal);
    return withdrawProfitTotal;
  } catch (error) {
    console.log("Fail calculate [WITHDRAW] profit: ");
    return 0;
  }
};

const calculateTradeProfit = async () => {
  try {
    // DO: Scan today trades
    const todayTrades = await peatioModel.trades.findAndCountAll({
      where: {
        created_at: {
          [Op.gte]: moment().subtract(1, "days").toDate(),
        },
      },
    });

    let tradeProfit = 0;

    const buyTrades = todayTrades.rows.filter(
      (trade) => trade.taker_type === "buy"
    );
    const sellTrades = todayTrades.rows.filter(
      (trade) => trade.taker_type === "sell"
    );

    // buy trades => maker_fee
    for await (const trade of buyTrades) {
      const { maker_order_id } = trade;
      const { maker_fee, bid } = (await peatioModel.orders.findOne({
        where: { id: maker_order_id },
      })) || { maker_fee: undefined, bid: undefined };
      if (maker_fee && bid) {
        const price = await getPrice(bid);
        if (price) {
          const profit = times(price, maker_fee);
          tradeProfit = plus(tradeProfit, profit);
        }
      }
    }

    // sell trades => taker_fee
    for await (const trade of sellTrades) {
      const { taker_order_id } = trade;
      const { taker_fee, bid } = (await peatioModel.orders.findOne({
        where: { id: taker_order_id },
      })) || { maker_fee: undefined, bid: undefined };
      if (taker_fee && bid) {
        const price = await getPrice(bid);
        if (price) {
          const profit = times(price, taker_fee);
          tradeProfit = plus(tradeProfit, profit);
        }
      }
    }
    console.log(tradeProfit);

    return tradeProfit;
  } catch (error) {
    console.log("Fail calculate [TRADE] profit: ");
    return 0;
  }
};

export const calProfit = async () => {
  try {
    console.log("Scanning");

    const depositProfit = await calculateDepositProfit();
    const withdrawProfit = await calculateWithdrawProfit();
    const tradeProfit = await calculateTradeProfit();

    const totalProfit = plus(depositProfit, withdrawProfit, tradeProfit);

    await holderModel.profits.create({
      trade: tradeProfit,
      deposit: depositProfit,
      withdraw: withdrawProfit,
      total: totalProfit,
      updated_at: new Date(),
    });
    console.log("Scan finish");
  } catch (error) {
    console.log(error);
  }
};
