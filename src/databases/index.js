require("dotenv").config();
const { DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_HOSTNAME } = process.env;

module.exports = {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_HOSTNAME,
    dialect: 'mysql',
}