const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const MYSQL_ENV_DATABASE = "ieo_production";

const pool = mysql.createPool({
    host: process.env.MYSQL_ENV_HOST,
    port: process.env.MYSQL_ENV_PORT,
    database: process.env.MYSQL_ENV_DATABASE || MYSQL_ENV_DATABASE,
    user: process.env.MYSQL_ENV_USER,
    password: process.env.MYSQL_ENV_PASSWORD,
});

module.exports = pool.promise();