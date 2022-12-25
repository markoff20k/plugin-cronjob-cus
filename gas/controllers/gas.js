const axios = require("axios");
const etherscanAPI = require("../api/etherscan_api");

const CurrenciesModel = require("../models/Currencies");
const GasPriceModel = require("../models/GasPrice");
const EthFeeModel = require("../models/EthFee");
const GasCurrencyOptionModel = require("../models/CurrencyOption");
const CurrencyModel = require("../models/Currency");
const MinCollectionModel = require("../models/MinCollection");

const updateEthFee = async (ethFee) => {
  try {
    await EthFeeModel.updateEthFee(ethFee);
  } catch (error) {
    console.error("ERROR UpdateETHFee: ", error);
  }
};

const updateCurrencyGasPrice = async (selectedGasPrice) => {
  try {
    /* UPDATE CURRENCY TABLE */
    await CurrencyModel.updateAllGasPrice(selectedGasPrice);
  } catch (error) {
    console.error("ERROR UpdateCurrencyGasPrice: ", error);
  }
};

const updateCurrencyOptions = async () => {
  try {
    const [currencies, field] = await CurrencyModel.fetch();
    for (
      let currency_index = 0;
      currency_index < currencies.length;
      currency_index++
    ) {
      const currency = currencies[currency_index];
      let currencyOption = {
        gas_price: +currency.gas_price * 1000000000,
      };
      if (currency.smart_contract_address) {
        currencyOption = {
          ...currencyOption,
          erc20_contract_address: currency.smart_contract_address,
        };
      }
      if (currency.gas_limit) {
        currencyOption = {
          ...currencyOption,
          gas_limit: currency.gas_limit,
        };
      }
      await GasCurrencyOptionModel.updateOptions(
        currency.currency_id,
        JSON.stringify(currencyOption)
      );
    }
  } catch (error) {
    console.error("ERROR UpdateCurrencyOptions: ", error);
  }
};

const updateMainCurrencies = async () => {
  try {
    const [gasCurrencies, field] = await GasCurrencyOptionModel.fetchOptions();
    for (
      let currency_index = 0;
      currency_index < gasCurrencies.length;
      currency_index++
    ) {
      const currencyOption = gasCurrencies[currency_index];
      await CurrenciesModel.updateOptions(
        currencyOption.currency_id,
        currencyOption.options
      );
    }
  } catch (error) {
    console.error("ERROR UpdateMainCurrencies: ", error);
  }
};

const updateMinCollectionAmount = async (selectedGasPrice) => {
  try {
    const [currency_ids, field] = await CurrenciesModel.fetchCurrencieIds();

    for (
      let currency_id_index = 0;
      currency_id_index < currency_ids.length;
      currency_id_index++
    ) {
      const currency_id = currency_ids[currency_id_index].id;
      console.log(currency_id, selectedGasPrice);
      const [currency, field] =
        await MinCollectionModel.fetchMinCollectionAmount(
          currency_id,
          selectedGasPrice
        );
      if (currency[0]) {
        const min_collection_amount = currency[0].min_collection_amount;
        await CurrenciesModel.updateMinCollectionAmount(
          currency_id,
          min_collection_amount
        );
      }
    }
    console.log("DONE");
  } catch (error) {
    console.error("ERROR UpdateMinCollectionAmount: ", error);
  }
};

exports.updateGasPrice = async () => {
  const gasType = 1;
  console.log("[GAS PRICE]Gas price cronjob");
  const gasOracleData = await axios.get(etherscanAPI.gasOracle());
  if (gasOracleData.data.status == 1) {
    const gasPrice = {
      low: gasOracleData.data.result.SafeGasPrice,
      standard: gasOracleData.data.result.ProposeGasPrice,
      high: gasOracleData.data.result.FastGasPrice,
    };
    const lowPrice = new GasPriceModel(1, gasPrice.low);
    const standardPrice = new GasPriceModel(2, gasPrice.standard);
    const highPrice = new GasPriceModel(3, gasPrice.high);

    const prices = [gasPrice.low, gasPrice.standard, gasPrice.high];
    const selectedGasPrice = prices[gasType - 1];
    try {
      /* GET DATA FROM API AND UPDATE GAS_PRICE TABLE */
      await lowPrice.updatePrice();
      await standardPrice.updatePrice();
      await highPrice.updatePrice();

      /* UPDATE ETH FEE */
      if (!selectedGasPrice) return;

      let ethFee = 0.01;
      if (selectedGasPrice <= 50) {
        ethFee = 0.01;
      } else if (selectedGasPrice <= 100) {
        ethFee = 0.012;
      } else if (selectedGasPrice <= 120) {
        ethFee = 0.015;
      } else if (selectedGasPrice <= 160) {
        ethFee = 0.02;
      } else {
        ethFee = 0.025;
      }
      console.log("Gas Price: " + selectedGasPrice, "Eth Fee: " + ethFee);
      await updateEthFee(ethFee);
      await updateCurrencyGasPrice(selectedGasPrice);
      /* UPDATE CURRENCY-OPTION TABLE */
      await updateCurrencyOptions();
      /* UPDATE CURRENCIES (MAIN) TABLE */
      await updateMainCurrencies();

      await updateMinCollectionAmount(selectedGasPrice);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
};
