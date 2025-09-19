const data = [
  {
    id: 1,
    nombre: "Venezolana",
  },
  {
    id: 2,
    nombre: "Colombiana",
  },
  {
    id: 3,
    nombre: "Peruana",
  },
  {
    id: 4,
    nombre: "Cubana",
  },
  {
    id: 5,
    nombre: "USA",
  },
];

export default handleCreate = async (db) => {
  if (( await db.nacionalidades.count() === 0)) {
    await db.nacionalidades.bulkCreate(data);
  }
};
