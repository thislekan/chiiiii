const dotEnv = require("dotenv");

dotEnv.config();
const { env } = process;

module.exports = {
  // JWT_SECRET: env.JWT_SECRET,
  NODE_ENV: env.NODE_ENV,
  DATABASE_URL: env.DATABASE_URL,
  DB_NAME: env.DB_NAME,
  DB_PASS: env.DB_PASS,
  DB_USERNAME: env.DB_USERNAME,
  DB_HOST: env.DB_HOST,
  DB_PORT: env.DB_PORT,
  PORT: env.PORT,
};
