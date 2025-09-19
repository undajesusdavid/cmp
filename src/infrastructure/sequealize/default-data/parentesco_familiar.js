const data = [
  { id: 1, nombre: "Padre" },
  { id: 2, nombre: "Madre" },
  { id: 3, nombre: "Esposo" },
  { id: 4, nombre: "Esposa" },
  { id: 5, nombre: "Hijo" },
  { id: 6, nombre: "Hija" },
];


const handleCreate = async (db) => {
  if (( await db.parentesco_familiar.count()) === 0) {
    await db.parentesco_familiar.bulkCreate(data);
  }
  
}

export default handleCreate;
