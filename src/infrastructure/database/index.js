import {initializeModels} from "../models/index.js";

//Registro de datos por defecto
import defaultData from "./defaultData/Register.js";

const runDatabase = async () => {
  
  try {
    const db = await initializeModels();
    await db.sequelize.sync({ force: false });
    defaultData.forEach(
      async (handleCreate) => await handleCreate(db)
    );
    console.log("base de datos conectada");
    return db;
  } catch (error) {
    console.log(error)
    console.log("No se pudo sincronizar la base de datos");
  }
};

export default runDatabase;
