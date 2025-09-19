import AppExpress from "./express/express.js";
import Database from "./sequealize/sequelize.js";
await AppExpress(await Database());