const RelEmployee = (db) => {
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
};

export default RelEmployee;
