const RelArchivedItem = (db) => {
  if (db.ElementoArchivado) {
    //Relacion con Contenedor
    if (db.Contenedor && db.ContenedorElemento) {
      db.ElementoArchivado.belongsToMany(db.Contenedor, {
        through: db.ContenedorElemento,
        foreignKey: "elemento_id",
        as: "contenedor",
      });
    } else {
      console.warn(
        "Advertencia: Los modelos 'ElementoArchivado' o 'Contenedor' no se encontraron para definir la asociación."
      );
    }
    //Relacion con Expediente
    if (db.Expediente) {
      db.ElementoArchivado.belongsTo(db.Expediente, {
        foreignKey: "expediente_id",
        as: "expediente",
      });
    } else {
      console.warn(
        "Advertencia: Los modelos 'ElementoArchivado' o 'Record' no se encontraron para definir la asociación"
      );
    }
    //Relacion con Clasificacion
    if (db.Clasificacion) {
      db.ElementoArchivado.belongsTo(db.Clasificacion, {
        foreignKey: "clasificacion_id",
        as: "clasificacion",
      });
    }else{
      console.warn(
        "Advertencia: Los modelos 'ElementoArchivado' o 'Clasificacion' no se encontraron para definir la asociación"
      );
    }

    if (db.departamentos) {
      db.ElementoArchivado.belongsTo(db.departamentos, {
        foreignKey: "departamento_id",
        as: "departamento",
      });
    }else{
      console.warn(
        "Advertencia: Los modelos 'ElementoArchivado' o 'Clasificacion' no se encontraron para definir la asociación"
      );
    }



  } else {
    console.warn(
      "Advertencia: El modelo 'ElementoArchivado' no se encontraron para definir la asociación"
    );
  }
};

export default RelArchivedItem;
