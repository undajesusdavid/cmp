// models/index.js
import { Sequelize } from "sequelize";
import { sequelize } from "../database/sequelize.js";
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url"; // Importa pathToFileURL

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = {};

// --- INICIO DE LA CARGA DE MODELOS (AHORA SÍ ASÍNCRONA PERO ESPERAMOS POR ELLA) ---
// Usamos Promise.all para esperar a que todos los modelos se importen y se definan.
async function loadModels() {
  const files = fs.readdirSync(__dirname).filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== path.basename(__filename) && // Excluye index.js
      file.slice(-3) === ".js"
    );
  });

  const modelPromises = files.map(async (file) => {
    const filePath = path.join(__dirname, file);
    const fileUrl = pathToFileURL(filePath).href; // Convertir ruta a URL
    const modelModule = await import(fileUrl);
    // Asegúrate de que el modelo exportado sea la función que espera 'sequelize'
    const model = modelModule.default(sequelize);
    db[model.name] = model;
  });

  await Promise.all(modelPromises); // Espera a que TODOS los modelos se carguen
}
// --- FIN DE LA CARGA DE MODELOS ---

// Función para definir las asociaciones después de que los modelos se han cargado
function defineAssociations() {
  // Asegúrate de que los nombres de las tablas en `db` coincidan con tus modelos definidos
  // por ejemplo, si tu modelo Permission es 'permisos', entonces db.permisos es correcto.
  // Si tu modelo Role es 'roles', entonces db.roles es correcto.
  // Y así sucesivamente.

  // Definir todas las asociaciones usando el método .associate si lo tienes
  // (Aunque en este caso lo estamos haciendo explícitamente abajo)
  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  // Asociaciones de Roles y Permisos (Muchos a Muchos):
  // Asegúrate de que los modelos db.roles y db.permisos existen antes de usarlos.
  // Los nombres de los modelos en db[] son los nombres que les diste en sequelize.define()
  // por ejemplo: sequelize.define("roles", { ... }) -> db.roles
  if (db.roles && db.permisos) {
    db.roles.belongsToMany(db.permisos, {
      through: "roles_permisos", // O el nombre de tu modelo de tabla pivote si lo tienes
      foreignKey: "role_id",
      otherKey: "permission_id",
      as: "permisos",
    });

    db.permisos.belongsToMany(db.roles, {
      through: "roles_permisos",
      foreignKey: "permission_id",
      otherKey: "role_id",
      as: "roles",
    });
  } else {
    console.warn(
      "Advertencia: Los modelos 'roles' o 'permisos' no se encontraron para definir la asociación Role-Permission."
    );
  }

  // Asociaciones de User y Roles (Muchos a Muchos):
  if (db.usuarios && db.roles) {
    db.usuarios.belongsToMany(db.roles, {
      through: "usuarios_roles", // Usa el modelo de la tabla pivote, por ejemplo: db.UsuariosRoles
      foreignKey: "user_id",
      otherKey: "role_id",
      as: "roles",
    });

    db.roles.belongsToMany(db.usuarios, {
      through: "usuarios_roles",
      foreignKey: "role_id",
      otherKey: "user_id",
      as: "usuarios",
    });
  } else {
    console.warn(
      "Advertencia: Los modelos 'usuarios' o 'roles' no se encontraron para definir la asociación User-Role."
    );
  }

  // Asociaciones de User y Permission (Muchos a Muchos):
  if (db.usuarios && db.permisos) {
    db.usuarios.belongsToMany(db.permisos, {
      through: "usuarios_permisos", // Usa el modelo de la tabla pivote, por ejemplo: db.UsuariosPermisos
      foreignKey: "user_id",
      otherKey: "permission_id",
      as: "permisos",
    });

    db.permisos.belongsToMany(db.usuarios, {
      through: "usuarios_permisos",
      foreignKey: "permission_id",
      otherKey: "user_id",
      as: "usuarios",
    });
  } else {
    console.warn(
      "Advertencia: Los modelos 'usuarios' o 'permisos' no se encontraron para definir la asociación User-Permission."
    );
  }

  // Asociaciones Usuario y Empleado (ya lo tenías en User.js, si se está duplicando, elige una sola ubicación)

  if (db.usuarios && db.empleados) {
    db.usuarios.belongsTo(db.empleados, {
      foreignKey: "empleado_id",
      allowNull: true,
      unique: true,
      as: "empleado",
    });
    db.empleados.hasOne(db.usuarios, {
      foreignKey: "empleado_id",
      as: "usuario",
    });
  } else {
    console.warn(
      "Advertencia: Los modelos 'usuarios' o 'empleados' no se encontraron para definir la asociación User-Employee."
    );
  }

  // Asociaciones de Empleados con Familia_Empleados
  if (db.familia_empleado && db.empleados) {
    db.familia_empleado.belongsTo(db.empleados, {
      foreignKey: "empleado_id",
      as: "empleado",
    });
    db.empleados.hasMany(db.familia_empleado, {
      foreignKey: "empleado_id",
      as: "familiares",
    });
  } else {
    console.warn(
      "Advertencia: Los modelos 'familia_empleado' o 'empleados' no se encontraron para definir la asociación Employee-Familia_Empleado."
    );
  }

  // Asociaciones de Familia_Empleados con Metadata (parentesco_familiar)
  if (db.familia_empleado && db.parentesco_familiar) {
    db.familia_empleado.belongsTo(db.parentesco_familiar, {
      foreignKey: "parentesco_id",
      as: "parentesco",
    });
    db.parentesco_familiar.hasMany(db.familia_empleado, {
      foreignKey: "parentesco_id",
    });
  } else {
    console.warn(
      "Advertencia: Los modelos 'familia_empleado' o 'parentesco_familiar' no se encontraron para definir la asociación Familia_Empleado-Parentesco."
    );
  }

  // Asociacioones de Empleados con Tallas de Empleado
  if (db.tallas_empleado && db.empleados) {
    db.tallas_empleado.belongsTo(db.empleados, {
      foreignKey: { name: "empleado_id", unique: true },
    });
    db.empleados.hasOne(db.tallas_empleado, {
      foreignKey: "empleado_id",
      as: "tallas",
    });
  } else {
    console.warn(
      "Advertencia: Los modelos 'tallas_empleado' o 'empleados' no se encontraron para definir la asociación Employee-Tallas_Empleado."
    );
  }

  // Asociaciones de Empleados con Vehiculo de Empleado
  if (db.vehiculo_empleado && db.empleados) {
    db.vehiculo_empleado.belongsTo(db.empleados, {
      foreignKey: { name: "empleado_id", unique: true },
    });
    db.empleados.hasMany(db.vehiculo_empleado, {
      foreignKey: "empleado_id",
      as: "vehiculos",
    });
  } else {
    console.warn(
      "Advertencia: Los modelos 'vehiculo_empleado' o 'empleados' no se encontraron para definir la asociación Employee-Vehiculo_Empleado."
    );
  }

  // Asociaciones de Empleados con Metadata
  if (db.empleados && db.nacionalidades) {
    db.empleados.belongsTo(db.nacionalidades, {
      foreignKey: "nacionalidad_id",
      as: "nacionalidad",
    });
  } else {
    console.warn(
      "Advertencia: Los modelos 'empleados' o 'nacionalidades' no se encontraron para definir la asociación Employee-Nacionalidad."
    );
  }

  if (db.empleados && db.tipo_viviendas) {
    db.empleados.belongsTo(db.tipo_viviendas, {
      foreignKey: "tipo_vivienda_id",
      as: "tipo_vivienda",
    });
  } else {
    console.warn(
      "Advertencia: Los modelos 'empleados' o 'tipo_viviendas' no se encontraron para definir la asociación Employee-Tipo_Vivienda."
    );
  }

  if (db.empleados && db.condicion_viviendas) {
    db.empleados.belongsTo(db.condicion_viviendas, {
      foreignKey: "condicion_vivienda_id",
      as: "cond_vivienda",
    });
  } else {
    console.warn(
      "Advertencia: Los modelos 'empleados' o 'condicion_viviendas' no se encontraron para definir la asociación Employee-Condicion_Vivienda."
    );
  }

  if (db.empleados && db.tipo_sangre) {
    db.empleados.belongsTo(db.tipo_sangre, {
      foreignKey: "tipo_sangre_id",
      as: "tipo_sangre",
    });
  } else {
    console.warn(
      "Advertencia: Los modelos 'empleados' o 'tipo_sagre' no se encontraron para definir la asociación Employee-Tipo_Sangre."
    );
  }

  if (db.empleados && db.niveles_academicos) {
    db.empleados.belongsTo(db.niveles_academicos, {
      foreignKey: "nivel_academico_id",
      as: "nivel_academico",
    });
  } else {
    console.warn(
      "Advertencia: Los modelos 'empleados' o 'niveles_academicos' no se encontraron para definir la asociación Employee-Nivel_Academico."
    );
  }

  if (db.empleados && db.profesiones) {
    db.empleados.belongsTo(db.profesiones, {
      foreignKey: "profesion_id",
      as: "profesion",
    });
  } else {
    console.warn(
      "Advertencia: Los modelos 'empleados' o 'profesiones' no se encontraron para definir la asociación Employee-Profesion."
    );
  }

  if (db.empleados && db.tipo_personal) {
    db.empleados.belongsTo(db.tipo_personal, {
      foreignKey: "tipo_personal_id",
      as: "tipo_personal",
    });
  } else {
    console.warn(
      "Advertencia: Los modelos 'empleados' o 'tipo_personal' no se encontraron para definir la asociación Employee-Tipo_Personal."
    );
  }

  if (db.empleados && db.cargos) {
    db.empleados.belongsTo(db.cargos, { foreignKey: "cargo_id", as: "cargo" });
  } else {
    console.warn(
      "Advertencia: Los modelos 'empleados' o 'cargos' no se encontraron para definir la asociación Employee-Cargo."
    );
  }

  if (db.empleados && db.departamentos) {
    db.empleados.belongsTo(db.departamentos, {
      foreignKey: "dir_adscrita_id",
      as: "departamento",
    });
  } else {
    console.warn(
      "Advertencia: Los modelos 'empleados' o 'departamentos' no se encontraron para definir la asociación Employee-Departamento."
    );
  }
} // Fin de defineAssociations

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
