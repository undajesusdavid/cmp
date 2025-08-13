const RelRecord = (db) => {
  if (db.Expediente && db.ElementoArchivado) {
    db.Expediente.hasMany(db.ElementoArchivado, {
      foreignKey: "expediente_id",
      onDelete: "SET NULL",
      as: "elementos",
    });
  } else {
    console.warn(
      "Advertencia: Los modelos 'Record' o 'ElementoArchivado' no se encontraron para definir la asociación"
    );
  }

  if (db.Expediente && db.departamentos) {
    db.Expediente.belongsTo(db.departamentos, {
      foreignKey: "departamento_id",
      as: "departamento",
    });
  } else {
    console.warn(
      "Advertencia: Los modelos 'Expediente' o 'departamento' no se encontraron para definir la asociación."
    );
  }
};

export default RelRecord;
