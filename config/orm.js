import { Sequelize } from "sequelize";
import { configDB as  config } from "./envairoments.js";

// Conexión a la base de datos
export const orm = new Sequelize(
    config.DB_NAME,
    config.DB_USER,
    config.DB_PASSWORD,
  {
    host: config.DB_HOST,
    dialect: config.DB_DIALECT,
  }
);
