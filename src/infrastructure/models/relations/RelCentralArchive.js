const RelCentralArchive = (db) => {
  if (db.inventario_documental) {
    
    //Relacion con la unidad de conservacion
    if (db.unidad_conservacion) {
      db.inventario_documental.belongsTo(db.unidad_conservacion, {
        foreignKey: "unidad_conservacion_id",
        as: "unidad_conservacion",
      });
    } else {
      console.warn(
        "Advertencia: Los modelos 'unidad_conservacion' o 'inventario_documental' no se encontraron para definir la asociación Role-Permission."
      );
    }


    // Relacion de muchos a uno.. con el contenido
    if (db.inventario_contenido) {
      db.inventario_contenido.belongsTo(db.inventario_documental, {
        foreignKey: "inventario_id",
        as: "inventario",
      })

      db.inventario_documental.hasMany(db.inventario_contenido, {
        foreignKey: "inventario_id",
        as: "contenido",
      });
    } else {
      console.warn(
        "Advertencia: Los modelos 'inventario_contenido' o 'inventario_documental' no se encontraron para definir la asociación Role-Permission."
      );
    }
  }
};


export default RelCentralArchive;
