const RelRecord = (db) => {

    if(db.Expediente && db.ElementoArchivado) {
        db.Expediente.hasMany(db.ElementoArchivado, {
            foreignKey: "expediente_id",
            onDelete: 'SET NULL',
            as: "elementos",
            
        });
    }else{
        console.warn(
            "Advertencia: Los modelos 'Record' o 'ElementoArchivado' no se encontraron para definir la asociación"
        );
    }

}


export default RelRecord;