const express = require("express");
const app = express();
const PORT = 4000;

const withdrawCronJob = require('./jobs/eth_withdraw');

withdrawCronJob.startWithdrawCronJob();

app.listen(process.env.PORT || PORT);