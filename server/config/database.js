const config = require("./index");

module.exports = {
  development: {
    username: config.DB_USERNAME,
    host: config.DB_HOST,
    dialect: "postgres",
    database: config.DB_NAME,
    password: config.DB_PASS,
  },
  production: {
    username: config.DB_USERNAME,
    host: config.DB_HOST,
    dialect: "postgres",
    database: config.DB_NAME,
    password: config.DB_PASS,
  },
  DATABASE_URL: config.DATABASE_URL,
};
