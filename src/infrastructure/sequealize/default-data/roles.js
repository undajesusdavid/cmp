const data = [
  {
    id: 1,
    nombre: "admin",
    descripcion: "administrador del sistema",
  },
];

const handleCreate = async (db) => {
  if (( await db.roles.count()) === 0) {
    await db.roles.bulkCreate(data);
  }
};

export default handleCreate;
