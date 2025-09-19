import type { Sequelize } from "sequelize";
import { ProcessImportModules } from "../../utils/import-modules/proces-import/ProcessImportModules.js";
import type { Router } from "express";

export default function LoadRoutes(db: Sequelize){
    const importRouters = new ProcessImportModules(import.meta.url,".js");  
    return importRouters.instantiateExportArray<Router>([db]);
}