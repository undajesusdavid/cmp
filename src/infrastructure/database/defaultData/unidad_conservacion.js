const data =  [
  {
    id: 1,
    nombre: "Carpeta",
  },
  {
    id: 2,
    nombre: "Encuadernado",
  },
  {
    id: 3,
    nombre: "Empastado",
  },
  {
    id: 4,
    nombre: "Caja",
  },
  {
    id: 5,
    nombre: "Archicomodo",
  },
];


const handleCreate = async (db) => {
  if ((await db.unidad_conservacion.count()) === 0) {
    await db.unidad_conservacion.bulkCreate(data);
  }
  
}

export default handleCreate;