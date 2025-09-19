import { Sequelize } from "sequelize";
import type { Dialect } from "sequelize";
import { LoadModels } from "./models/LoadModels.js";
import { LoadRelations } from "./relations/LoadRelations.js";
import { LoadDefaultData } from "./default-data/LoadDefaultData.js";
import { configDB } from "../config/envairoments.js";

// Conexión a la base de datos
const sequelize = new Sequelize(
  configDB.DB_NAME,
  configDB.DB_USER,
  configDB.DB_PASSWORD,
  {
    host: configDB.DB_HOST,
    port: parseInt(configDB.DB_PORT),
    dialect: configDB.DB_DIALECT as Dialect,
    timezone: "+00:00",
    logging: false,
  }
);

export default async function Database(): Promise<Sequelize> {
  await LoadModels(sequelize);
  await LoadRelations(sequelize);
  await sequelize.sync({ force: false, alter: true }).then(() => {
    LoadDefaultData(sequelize);
    console.log("Base de datos cargada con exito!")
  });
  return sequelize;
}

export { sequelize };
