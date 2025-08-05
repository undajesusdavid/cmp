const data =  [
  {
    id: 1,
    nombre: "Maika",
  },
  {
    id: 2,
    nombre: "Carpeta",
  },
  {
    id: 3,
    nombre: "Encuadernado",
  },
  {
    id: 4,
    nombre: "Empastado",
  },
  {
    id: 5,
    nombre: "Caja",
  },
  {
    id: 6,
    nombre: "Archicomodo",
  },
];


const handleCreate = async (db) => {
  if ((await db.UnidadConservacion.count()) === 0) {
    await db.UnidadConservacion.bulkCreate(data);
  }
  
}

export default handleCreate;