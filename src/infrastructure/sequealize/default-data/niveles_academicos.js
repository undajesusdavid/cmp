const data = [
  {
    id: 1,
    nivel: "Bachiller",
  },
  {
    id: 2,
    nivel: "Universitario",
  },
  {
    id: 3,
    nivel: "TSU",
  },
  {
    id: 4,
    nivel: "Ingenieria",
  },
  {
    id: 5,
    nivel: "Licenciatura",
  },
  {
    id: 6,
    nivel: "Maestria",
  },
  {
    id: 7,
    nivel: "Doctorado",
  },
];

const handleCreate = async (db) => {
  if ((await db.niveles_academicos.count()) === 0) {
    await db.niveles_academicos.bulkCreate(data);
  }
  
};

export default handleCreate;
