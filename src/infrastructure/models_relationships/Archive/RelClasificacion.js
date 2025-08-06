const RelClasificacion = (db) => {
  if (db.Clasificacion && db.ElementoArchivado) {
    db.Clasificacion.hasMany(db.ElementoArchivado, {
      foreignKey: "clasificacion_id",
      //onDelete: 'SET NULL',
      as: "elementos",
    });
  } else {
    console.warn(
      "Advertencia: Los modelos 'Clasificacion' o 'ElementoArchivado' no se encontraron para definir la asociación"
    );
  }

  if (db.Clasificacion && db.departamentos) {
    db.Clasificacion.belongsTo(db.departamentos, {
      foreignKey: "departamento_id",
      as: "departamento",
    });
  } else {
    console.warn(
      "Advertencia: Los modelos 'Clasificacion' o 'departamentos' no se encontraron para definir la asociación."
    );
  }
};

export default RelClasificacion;
