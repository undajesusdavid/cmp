import { sequelize } from "./sequelize.js";
import "../models/Nationality.js";
import "../models/TypeHousing.js";
import "../models/CondHousing.js";
import "../models/BloodType.js";
import "../models/AcademicLevel.js";
import "../models/Employee.js";
import "../models/EmployeeSizes.js";
import buildNationality from "./buildNationality.js";
import buildTypeHousing from "./buildTypeHousing.js";
import buildCondHousing from "./buildCondHousing.js";
import buildBloodType from "./buildBloodType.js";
import buildAcademicLevel from "./buildAcademicLevel.js";
import buildProfession from "./buildProfession.js";
import buildStaffType from "./buildStaffType.js";
import buildJobPosition from "./buildJobPosition.js";
import buildDepartment from "./buildDepartment.js";

export const runDatabase = async () => {
  try {
    await sequelize.sync({ force: false });
    await buildNationality();
    await buildTypeHousing();
    await buildCondHousing();
    await buildBloodType();
    await buildAcademicLevel();
    await buildProfession();
    await buildStaffType();
    await buildJobPosition();
    await buildDepartment();
    console.log("base de datos conectada");
  } catch (error) {
    console.log("No se pudo sincronizar la base de datos");
  }
};
