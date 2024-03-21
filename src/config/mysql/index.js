const Sequelize = require("sequelize");
const { DB_DATABASE, DB_USERNAME, DB_PASSWORD, DB_HOSTNAME } = process.env;

const db = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOSTNAME,
  dialect: "mysql",
  logging: false,
});

module.exports = db;