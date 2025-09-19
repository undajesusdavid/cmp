const data = [
  {
    id: 1,
    tipo: "Casa",
  },
  {
    id: 2,
    tipo: "Apartamento",
  },
  {
    id: 3,
    tipo: "Pieza",
  },
];

const handleCreate = async (db) => {
  if ((await db.tipo_viviendas.count()) === 0) {
    await db.tipo_viviendas.bulkCreate(data);
  }
};

export default handleCreate;
