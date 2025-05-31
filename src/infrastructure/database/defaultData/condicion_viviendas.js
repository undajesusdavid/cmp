const data =  [
  {
    id: 1,
    condicion: "Propia",
  },
  {
    id: 2,
    condicion: "De un familiar",
  },
  {
    id: 3,
    condicion: "Alquilada",
  },
];


const handleCreate = async (db) => {
  if ((await db.condicion_viviendas.count()) === 0) {
    await db.condicion_viviendas.bulkCreate(data);
  }
  
}

export default handleCreate;