import fs from "fs/promises";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Función recursiva asíncrona para obtener todos los archivos .js en subcarpetas, excluyendo index.js
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
      path.basename(filePath) !== "index.js" &&
      file.slice(-3) === ".js"
    ) {
      results.push(filePath);
    }
  }
  return results;
}

const Api = async (db) => {
  const files = await getJsFiles(__dirname);

  const apiInstances = await Promise.all(
    files.map(async (filePath) => {
      try {
        const fileUrl = pathToFileURL(filePath).href;
        const module = await import(fileUrl);
        if (typeof module.default === "function") {
          return module.default(db);
        }
      } catch (error) {
        console.error(`Error cargando API en ${filePath}:`, error);
      }
      return null;
    })
  );

  // Retorna todas las instancias válidas en un array
  return apiInstances.filter((instance) =>  instance );
};

export { Api };