import { Sequelize } from "sequelize";
import { configDB as config } from "../config/envairoments.js";

// Conexión a la base de datos
const sequelize = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PASSWORD,
  {
    host: config.DB_HOST,
    port: config.DB_PORT,
    dialect: config.DB_DIALECT,
    timezone: "+00:00"
  }
);


export {sequelize}
