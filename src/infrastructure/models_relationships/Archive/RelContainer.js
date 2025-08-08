const RelContainer = (db) => {
  //Relacion con la unidad de conservacion
  if (db.Contenedor && db.UnidadConservacion) {
    db.Contenedor.belongsTo(db.UnidadConservacion, {
      foreignKey: "unidad_conservacion_id",
      as: "unidad_conservacion",
    });
  } else {
    console.warn(
      "Advertencia: Los modelos 'Contenedor' o 'UnidadConservacion' no se encontraron para definir la asociación"
    );
  }

  //Relacion con el departamento
  if (db.Contenedor && db.departamentos) {
    db.Contenedor.belongsTo(db.departamentos, {
      foreignKey: "departamento_id",
      as: "departamento",
    });
  } else {
    console.warn(
      "Advertencia: Los modelos 'Contenedor' o 'departamento' no se encontraron para definir la asociación."
    );
  }
  // Relacion de muchos a muchos con ElementoArchivado
  if (db.Contenedor && db.ElementoArchivado) {
    db.Contenedor.belongsToMany(db.ElementoArchivado, {
      through: db.ContenedorElemento,
      foreignKey: "contenedor_id",
    });
  } else {
    console.warn(
      "Advertencia: Los modelos 'Contenedor' o 'ElementoArchivado' no se encontraron para definir la asociación."
    );
  }
};


export default RelContainer;