// models/index.js
import { Sequelize } from "sequelize";
import { sequelize } from "../database/sequelize.js";
import fs from "fs/promises"; // Usar versión asíncrona
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import AllRelationships from "../models_relationships/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = {};

// Función recursiva asíncrona para obtener todos los archivos .js en subcarpetas
async function getJsFiles(dir) {
  let results = [];
  const list = await fs.readdir(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);
    if (stat && stat.isDirectory()) {
      const subResults = await getJsFiles(filePath); // Recursivo en subcarpetas
      results = results.concat(subResults);
    } else if (
      file.indexOf(".") !== 0 && // Excluye archivos ocultos
      file !== path.basename(__filename) && // Excluye index.js
      file.slice(-3) === ".js"
    ) {
      results.push(filePath);
    }
  }
  return results;
}

/* --- INICIO DE LA CARGA DE MODELOS (AHORA ASÍNCRONA Y NO BLOQUEANTE) --- */
async function loadModels() {
  const files = await getJsFiles(__dirname);

  const modelPromises = files.map(async (filePath) => {
    const fileUrl = pathToFileURL(filePath).href;
    try {
      const modelModule = await import(fileUrl);
      if (typeof modelModule.default === "function") {
        const model = modelModule.default(sequelize);
        db[model.name] = model;
        console.log(`Modelo '${model.name}' cargado exitosamente desde '${filePath}'.`);
      } else {
        console.warn(
          `Advertencia: El archivo ${filePath} no exporta una función por defecto válida para un modelo. Ignorando.`
        );
      }
    } catch (error) {
      console.error(`Error crítico al cargar el modelo desde ${filePath}:`, error);
    }
  });

  await Promise.all(modelPromises);
}

// Función para definir las asociaciones después de que los modelos se han cargado
async function defineAssociations() {
  for (const modelName of Object.keys(db)) {
    if (db[modelName].associate) {
      console.log(`Definiendo asociaciones para el modelo '${modelName}'.`);
      db[modelName].associate(db);
    } else {
      console.warn(
        `Advertencia: El modelo '${modelName}' no tiene un método 'associate' definido.`
      );
    }
  }

  // Cargar Relaciones (asíncrono si AllRelationships lo es)
  if (AllRelationships.constructor.name === "AsyncFunction") {
    await AllRelationships(db);
  } else {
    AllRelationships(db);
  }
}

// Exporta una función asíncrona para cargar los modelos y definir las asociaciones
export async function initializeModels() {
  await loadModels(); // Primero carga todos los modelos
  await defineAssociations(); // Luego define todas las asociaciones

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  return db;
}

// export default db;
