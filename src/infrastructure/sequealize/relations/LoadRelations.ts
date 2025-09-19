import type { Sequelize } from "sequelize";
import { ProcessImportModules } from "../../utils/import-modules/proces-import/ProcessImportModules.js";

export function LoadRelations(sequelize: Sequelize){
    const importRelations = new ProcessImportModules(import.meta.url,".js",[]);
    return importRelations.instantiateExportArray<Sequelize>([sequelize.models], "default");
}