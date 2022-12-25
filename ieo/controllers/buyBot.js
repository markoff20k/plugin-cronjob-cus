const BuyHistoryModel = require("../models/BuyHistory");
const IEOModel = require("../models/IEO");

const fns = require("date-fns");
const axios = require("axios");
const NP = require("number-precision");
NP.enableBoundaryChecking(false); // default param is true

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const convertPrice = (quote_currency, quote_price, base_price) => {
  switch (String(quote_currency).toLowerCase()) {
    case "bnb":
      return NP.divide(NP.divide(1, quote_price), NP.divide(1, base_price));
    case "trx":
      return NP.divide(NP.divide(1, quote_price), NP.divide(1, base_price));
    default:
      return NP.divide(quote_price, NP.divide(1, base_price));
  }
};

const getPrice = async (fsym, tsyms, base_price) => {
  const COMPARE_BASE_API_URL = "https://min-api.cryptocompare.com/data/price";
  const API_KEY =
    "25fc5392e29e67321a0bfb9ff465ea0671c5c3b741266b0e04dc79264efb9ee3";
  try {
    switch (String(tsyms).toUpperCase()) {
      case "BNB":
        const kobePrice = await axios.get(
          "https://ex.udonex.com/api/v2/udonex/public/markets/bnbusdt/tickers"
        );
        quote_price = Number(kobePrice.data.ticker.last) || 0; // 1 KOBE = x usdt
        break;
      case "TRX":
        const escPrice = await axios.get(
          "https://ex.udonex.com/api/v2/udonex/public/markets/trxusdt/tickers"
        );
        quote_price = Number(escPrice.data.ticker.last) || 0;
        break;
      default:
        const price = await axios.get(
          `${COMPARE_BASE_API_URL}?fsym=${fsym}&tsyms=${tsyms}&api_key=${API_KEY}`
        );
        quote_price = price.data[tsyms] || 0;
        break;
    }
    return convertPrice(tsyms, quote_price, base_price);
    // base_price: 1 LKT = 0.025 USDT => 40LKT = 1 USDT
    // price: 1 KOBE = 0.002 USDT => 500 KOBE = 1 USDT
    // Calculator: 1 LKT = ?? KOBE => 1 LKT = 500/40 = 12.5 KOBE
  } catch (error) {
    console.log(error);
    throw new Error("Can not get price of selected currency.");
  }
};

exports.autoBuy = async () => {
  try {
    const DEFAULT_ID = 1;
    const RUNNING_IEO = 2;
    const BASE_CURRENCY = "doo";
    const fakeUids = "ID" + makeid(10).toUpperCase();
    const currencies = ["bnb", "trx", "busd", "eth", "btc", "usdt"];
    const randomCurrencies =
      currencies[Math.floor(Math.random() * 5)].toUpperCase();
    let fakeQuantity;
    const QUANTITY = 10000000000; // 10000000000 = 10 USDT
    switch (randomCurrencies.toUpperCase()) {
      case "BNB":
        fakeQuantity = Math.floor(Math.random() * QUANTITY + QUANTITY);
        break;
      case "TRX":
        fakeQuantity = Math.floor(Math.random() * QUANTITY + QUANTITY);
        break;
      case "BUSD":
        fakeQuantity = Math.floor(Math.random() * QUANTITY + QUANTITY);
        break;
      default:
        fakeQuantity = Math.floor(Math.random() * QUANTITY + QUANTITY);
        break;
    }
    // const fakePurchase = Math.floor(Math.random() * 500 + 500);
    const price = await getPrice("USD", randomCurrencies, 0.000000001);
    // const fakeQuantity = fakePurchase / price;
    const fakePurchase = fakeQuantity * price;

    try {
      const buyData = new BuyHistoryModel(
        RUNNING_IEO, // LKT IEO
        fakeUids,
        DEFAULT_ID,
        fakeQuantity.toFixed(0),
        BASE_CURRENCY,
        fakePurchase.toFixed(6),
        randomCurrencies,
        "success",
        fns.subMinutes(new Date(), Math.floor(Math.random() * (30 - 10)) + 10)
      );
      console.log(buyData);
      await buyData.save();
      await IEOModel.updateTokenRemains(RUNNING_IEO, fakeQuantity);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};
