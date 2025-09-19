import type { Sequelize } from "sequelize";
import { ProcessImportModules } from "../../utils/import-modules/proces-import/ProcessImportModules.js";

export function LoadModels(sequelize: Sequelize) {

    const importModels = new ProcessImportModules(import.meta.url, ".js", []);
    return importModels.instantiateExportArray<Sequelize>([sequelize]);
   
}