// models/index.js
import { Sequelize } from "sequelize";
import { sequelize } from "../database/sequelize.js";
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url"; // Importa pathToFileURL
import AllRelationships from "./relations/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = {};

/* --- INICIO DE LA CARGA DE MODELOS (AHORA SÍ ASÍNCRONA PERO ESPERAMOS POR ELLA) ---
Usamos Promise.all para esperar a que todos los modelos se importen y se definan.*/
async function loadModels() {
  const files = fs.readdirSync(__dirname).filter((file) => {
    return (
      file.indexOf(".") !== 0 && // Excluye archivos ocultos
      file !== path.basename(__filename) && // Excluye index.js
      file.slice(-3) === ".js" // Solo toma los archivos js
    );
  });

  const modelPromises = files.map(async (file) => {
    const filePath = path.join(__dirname, file);
    const fileUrl = pathToFileURL(filePath).href; // Convertir ruta a URL
    try {
      const modelModule = await import(fileUrl);
      if (typeof modelModule.default === "function") {
        const model = modelModule.default(sequelize);
        db[model.name] = model;
        console.log(`Modelo '${model.name}' cargado exitosamente.`);
      } else {
        console.warn(
          `Advertencia: El archivo ${file} no exporta una función por defecto válida para un modelo. Ignorando.`
        );
      }
    } catch (error) {
      console.error(`Error crítico al cargar el modelo desde ${file}:`, error);
    }
  });

  await Promise.all(modelPromises); // Espera a que TODOS los modelos se carguen
}

// --- FIN DE LA CARGA DE MODELOS ---

// Función para definir las asociaciones después de que los modelos se han cargado
function defineAssociations() {
  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      console.log(`Definiendo asociaciones para el modelo '${modelName}'.`);
      db[modelName].associate(db);
    } else {
      console.warn(
        `Advertencia: El modelo '${modelName}' no tiene un método 'associate' definido.`
      );
    }
  });

  //Cargar Relaciones 
  AllRelationships(db);
}



// Exporta una función asíncrona para cargar los modelos y definir las asociaciones
// Esto es lo que importarás y llamarás en tu archivo principal (ej. app.js)
export async function initializeModels() {
  await loadModels(); // Primero carga todos los modelos
  defineAssociations(); // Luego define todas las asociaciones

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  return db;
}

// Puedes exportar db directamente si solo quieres los modelos sin asegurar que las asociaciones estén definidas
// al momento de la importación inicial, pero la función initializeModels es más robusta.
// export default db;
