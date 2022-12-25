import type { Sequelize, Model } from "sequelize";
import { accounts } from "./accounts";
import type { accountsAttributes, accountsCreationAttributes } from "./accounts";
import { adjustments } from "./adjustments";
import type { adjustmentsAttributes, adjustmentsCreationAttributes } from "./adjustments";
import { ar_internal_metadata } from "./ar_internal_metadata";
import type { ar_internal_metadataAttributes, ar_internal_metadataCreationAttributes } from "./ar_internal_metadata";
import { assets } from "./assets";
import type { assetsAttributes, assetsCreationAttributes } from "./assets";
import { beneficiaries } from "./beneficiaries";
import type { beneficiariesAttributes, beneficiariesCreationAttributes } from "./beneficiaries";
import { blockchains } from "./blockchains";
import type { blockchainsAttributes, blockchainsCreationAttributes } from "./blockchains";
import { currencies } from "./currencies";
import type { currenciesAttributes, currenciesCreationAttributes } from "./currencies";
import { currencies_wallets } from "./currencies_wallets";
import type { currencies_walletsAttributes, currencies_walletsCreationAttributes } from "./currencies_wallets";
import { deposits } from "./deposits";
import type { depositsAttributes, depositsCreationAttributes } from "./deposits";
import { engines } from "./engines";
import type { enginesAttributes, enginesCreationAttributes } from "./engines";
import { expenses } from "./expenses";
import type { expensesAttributes, expensesCreationAttributes } from "./expenses";
import { internal_transfers } from "./internal_transfers";
import type { internal_transfersAttributes, internal_transfersCreationAttributes } from "./internal_transfers";
import { jobs } from "./jobs";
import type { jobsAttributes, jobsCreationAttributes } from "./jobs";
import { liabilities } from "./liabilities";
import type { liabilitiesAttributes, liabilitiesCreationAttributes } from "./liabilities";
import { markets } from "./markets";
import type { marketsAttributes, marketsCreationAttributes } from "./markets";
import { members } from "./members";
import type { membersAttributes, membersCreationAttributes } from "./members";
import { operations_accounts } from "./operations_accounts";
import type { operations_accountsAttributes, operations_accountsCreationAttributes } from "./operations_accounts";
import { orders } from "./orders";
import type { ordersAttributes, ordersCreationAttributes } from "./orders";
import { payment_addresses } from "./payment_addresses";
import type { payment_addressesAttributes, payment_addressesCreationAttributes } from "./payment_addresses";
import { refunds } from "./refunds";
import type { refundsAttributes, refundsCreationAttributes } from "./refunds";
import { revenues } from "./revenues";
import type { revenuesAttributes, revenuesCreationAttributes } from "./revenues";
import { schema_migrations } from "./schema_migrations";
import type { schema_migrationsAttributes, schema_migrationsCreationAttributes } from "./schema_migrations";
import { stats_member_pnl } from "./stats_member_pnl";
import type { stats_member_pnlAttributes, stats_member_pnlCreationAttributes } from "./stats_member_pnl";
import { stats_member_pnl_idx } from "./stats_member_pnl_idx";
import type { stats_member_pnl_idxAttributes, stats_member_pnl_idxCreationAttributes } from "./stats_member_pnl_idx";
import { trades } from "./trades";
import type { tradesAttributes, tradesCreationAttributes } from "./trades";
import { trading_fees } from "./trading_fees";
import type { trading_feesAttributes, trading_feesCreationAttributes } from "./trading_fees";
import { transactions } from "./transactions";
import type { transactionsAttributes, transactionsCreationAttributes } from "./transactions";
import { transfers } from "./transfers";
import type { transfersAttributes, transfersCreationAttributes } from "./transfers";
import { triggers } from "./triggers";
import type { triggersAttributes, triggersCreationAttributes } from "./triggers";
import { wallets } from "./wallets";
import type { walletsAttributes, walletsCreationAttributes } from "./wallets";
import { whitelisted_smart_contracts } from "./whitelisted_smart_contracts";
import type { whitelisted_smart_contractsAttributes, whitelisted_smart_contractsCreationAttributes } from "./whitelisted_smart_contracts";
import { withdraw_limits } from "./withdraw_limits";
import type { withdraw_limitsAttributes, withdraw_limitsCreationAttributes } from "./withdraw_limits";
import { withdraws } from "./withdraws";
import type { withdrawsAttributes, withdrawsCreationAttributes } from "./withdraws";

export {
  accounts,
  adjustments,
  ar_internal_metadata,
  assets,
  beneficiaries,
  blockchains,
  currencies,
  currencies_wallets,
  deposits,
  engines,
  expenses,
  internal_transfers,
  jobs,
  liabilities,
  markets,
  members,
  operations_accounts,
  orders,
  payment_addresses,
  refunds,
  revenues,
  schema_migrations,
  stats_member_pnl,
  stats_member_pnl_idx,
  trades,
  trading_fees,
  transactions,
  transfers,
  triggers,
  wallets,
  whitelisted_smart_contracts,
  withdraw_limits,
  withdraws,
};

export type {
  accountsAttributes,
  accountsCreationAttributes,
  adjustmentsAttributes,
  adjustmentsCreationAttributes,
  ar_internal_metadataAttributes,
  ar_internal_metadataCreationAttributes,
  assetsAttributes,
  assetsCreationAttributes,
  beneficiariesAttributes,
  beneficiariesCreationAttributes,
  blockchainsAttributes,
  blockchainsCreationAttributes,
  currenciesAttributes,
  currenciesCreationAttributes,
  currencies_walletsAttributes,
  currencies_walletsCreationAttributes,
  depositsAttributes,
  depositsCreationAttributes,
  enginesAttributes,
  enginesCreationAttributes,
  expensesAttributes,
  expensesCreationAttributes,
  internal_transfersAttributes,
  internal_transfersCreationAttributes,
  jobsAttributes,
  jobsCreationAttributes,
  liabilitiesAttributes,
  liabilitiesCreationAttributes,
  marketsAttributes,
  marketsCreationAttributes,
  membersAttributes,
  membersCreationAttributes,
  operations_accountsAttributes,
  operations_accountsCreationAttributes,
  ordersAttributes,
  ordersCreationAttributes,
  payment_addressesAttributes,
  payment_addressesCreationAttributes,
  refundsAttributes,
  refundsCreationAttributes,
  revenuesAttributes,
  revenuesCreationAttributes,
  schema_migrationsAttributes,
  schema_migrationsCreationAttributes,
  stats_member_pnlAttributes,
  stats_member_pnlCreationAttributes,
  stats_member_pnl_idxAttributes,
  stats_member_pnl_idxCreationAttributes,
  tradesAttributes,
  tradesCreationAttributes,
  trading_feesAttributes,
  trading_feesCreationAttributes,
  transactionsAttributes,
  transactionsCreationAttributes,
  transfersAttributes,
  transfersCreationAttributes,
  triggersAttributes,
  triggersCreationAttributes,
  walletsAttributes,
  walletsCreationAttributes,
  whitelisted_smart_contractsAttributes,
  whitelisted_smart_contractsCreationAttributes,
  withdraw_limitsAttributes,
  withdraw_limitsCreationAttributes,
  withdrawsAttributes,
  withdrawsCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  accounts.initModel(sequelize);
  adjustments.initModel(sequelize);
  ar_internal_metadata.initModel(sequelize);
  assets.initModel(sequelize);
  beneficiaries.initModel(sequelize);
  blockchains.initModel(sequelize);
  currencies.initModel(sequelize);
  currencies_wallets.initModel(sequelize);
  deposits.initModel(sequelize);
  engines.initModel(sequelize);
  expenses.initModel(sequelize);
  internal_transfers.initModel(sequelize);
  jobs.initModel(sequelize);
  liabilities.initModel(sequelize);
  markets.initModel(sequelize);
  members.initModel(sequelize);
  operations_accounts.initModel(sequelize);
  orders.initModel(sequelize);
  payment_addresses.initModel(sequelize);
  refunds.initModel(sequelize);
  revenues.initModel(sequelize);
  schema_migrations.initModel(sequelize);
  stats_member_pnl.initModel(sequelize);
  stats_member_pnl_idx.initModel(sequelize);
  trades.initModel(sequelize);
  trading_fees.initModel(sequelize);
  transactions.initModel(sequelize);
  transfers.initModel(sequelize);
  triggers.initModel(sequelize);
  wallets.initModel(sequelize);
  whitelisted_smart_contracts.initModel(sequelize);
  withdraw_limits.initModel(sequelize);
  withdraws.initModel(sequelize);


  return {
    accounts: accounts,
    adjustments: adjustments,
    ar_internal_metadata: ar_internal_metadata,
    assets: assets,
    beneficiaries: beneficiaries,
    blockchains: blockchains,
    currencies: currencies,
    currencies_wallets: currencies_wallets,
    deposits: deposits,
    engines: engines,
    expenses: expenses,
    internal_transfers: internal_transfers,
    jobs: jobs,
    liabilities: liabilities,
    markets: markets,
    members: members,
    operations_accounts: operations_accounts,
    orders: orders,
    payment_addresses: payment_addresses,
    refunds: refunds,
    revenues: revenues,
    schema_migrations: schema_migrations,
    stats_member_pnl: stats_member_pnl,
    stats_member_pnl_idx: stats_member_pnl_idx,
    trades: trades,
    trading_fees: trading_fees,
    transactions: transactions,
    transfers: transfers,
    triggers: triggers,
    wallets: wallets,
    whitelisted_smart_contracts: whitelisted_smart_contracts,
    withdraw_limits: withdraw_limits,
    withdraws: withdraws,
  };
}
