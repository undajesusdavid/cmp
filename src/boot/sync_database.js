import { orm } from "../config/orm.js";
import "../models/Employee.js";

export const runDatabase = async () => {
   
    try {
        orm.sync({force: false});
        console.log("base de datos conectada")
    } catch (error) {
        console.log("No se pudo sincronizar la base de datos")
    }
    
}

