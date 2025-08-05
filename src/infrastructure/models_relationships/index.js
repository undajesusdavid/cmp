import fs from "fs/promises";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Función recursiva asíncrona para obtener todos los archivos .js en subcarpetas
async function getJsFiles(dir) {
  let results = [];
  const list = await fs.readdir(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);
    if (stat && stat.isDirectory()) {
      const subResults = await getJsFiles(filePath);
      results = results.concat(subResults);
    } else if (
      file.indexOf(".") !== 0 &&
      file !== path.basename(__filename) &&
      file.slice(-3) === ".js"
    ) {
      results.push(filePath);
    }
  }
  return results;
}

// Carga y ejecuta todas las relaciones de modelos de forma asíncrona
const AllRelationships = async (db) => {
  const files = await getJsFiles(__dirname);

  for (const filePath of files) {
    const fileUrl = pathToFileURL(filePath).href;
    try {
      const relModule = await import(fileUrl);
      if (typeof relModule.default === "function") {
        await relModule.default(db);
        console.log(`Relación '${filePath}' aplicada correctamente.`);
      } else {
        console.warn(
          `Advertencia: El archivo ${filePath} no exporta una función por defecto válida para una relación. Ignorando.`
        );
      }
    } catch (error) {
      console.error(`Error al cargar la relación desde ${filePath}:`, error);
    }
  }
};

export default AllRelationships;