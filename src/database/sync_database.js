import { sequelize } from "./sequelize.js";
import "../models/Nationality.js";
import "../models/TypeHousing.js";
import "../models/CondHousing.js";
import "../models/BloodType.js";
import "../models/Employee.js";
import buildNationality from "./buildNationality.js";
import buildTypeHousing from "./buildTypeHousing.js";
import buildCondHousing from "./buildCondHousing.js";
import buildBloodType from "./buildBloodType.js";


export const runDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    await buildNationality();
    await buildTypeHousing();
    await buildCondHousing();
    await buildBloodType();
    console.log("base de datos conectada");
  } catch (error) {
    console.log("No se pudo sincronizar la base de datos");
  }
};


