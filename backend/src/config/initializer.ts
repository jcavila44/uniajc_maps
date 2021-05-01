import DotEnv from "dotenv";

DotEnv.config();

const PORT = process.env.PORT,
  USER_DB = process.env.USER_DB,
  USER_PASSWORD = process.env.USER_PASSWORD,
  DB_HOST = process.env.DB_HOST,
  DB_NAME = process.env.DB_NAME;

  export {PORT, USER_DB,USER_PASSWORD, DB_HOST, DB_NAME}