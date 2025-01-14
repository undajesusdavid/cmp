import { sequelize } from "./sequelize.js";

import "../models/Employee.js";
import "../models/EmployeeSizes.js";
import "../models/EmployeeFamily.js";
import metadata from "./metadata/Register.js";

const loadDataIntoDB = async (model, data) => {
  if ((await model.count()) != data.length) {
    data.forEach(async (field) => await model.findOrCreate({ where: field }));
  }
};

export const runDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    metadata.forEach(
      async (source) => await loadDataIntoDB(source.table, source.data)
    );
    console.log("base de datos conectada");
  } catch (error) {
    console.log("No se pudo sincronizar la base de datos");
  }
};
