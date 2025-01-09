import { sequelize } from "./sequelize.js";
import buildNationality from "./buildNationality.js";
import "../models/Employee.js";



export const runDatabase = async () => {
  try {
    sequelize.sync({ force: false });
    await buildNationality();
    console.log("base de datos conectada");
  } catch (error) {
    console.log("No se pudo sincronizar la base de datos");
  }
};


