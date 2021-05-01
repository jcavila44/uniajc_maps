import {ConnectionOptions} from 'typeorm';
import { PORT, USER_DB, USER_PASSWORD, DB_HOST, DB_NAME } from "./initializer";
import {Personas}  from "../database/entity/personas";
import {Usuario}  from "../database/entity/usuario";

const CONNECTION: ConnectionOptions = {
    type: "postgres",
    host: DB_HOST,
    username: USER_DB,
    password: USER_PASSWORD,
    database: DB_NAME,
    entities: [Personas, Usuario],
    synchronize: true,
    logging: false,
  };

  export { CONNECTION, Personas, Usuario}