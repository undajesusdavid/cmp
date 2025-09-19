import type { Sequelize } from "sequelize";
import { ProcessImportModules } from "../../utils/import-modules/proces-import/ProcessImportModules.js";

export function LoadDefaultData(sequelize: Sequelize) {
    const importData = new ProcessImportModules(import.meta.url, ".js", ["Register"]);
    return importData.instantiateExportArray([sequelize.models]);
}