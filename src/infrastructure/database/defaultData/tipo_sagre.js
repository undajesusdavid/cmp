const data = [
  {
    id: 1,
    tipo: "O+",
  },
  {
    id: 2,
    tipo: "O-",
  },
  {
    id: 3,
    tipo: "B+",
  },
  {
    id: 4,
    tipo: "B-",
  },
  {
    id: 5,
    tipo: "A+",
  },
  {
    id: 6,
    tipo: "A-",
  },
  {
    id: 7,
    tipo: "AB+",
  },
  {
    id: 8,
    tipo: "AB-",
  },
];

const handleCreate = async (db) => {
  if (( await db.tipo_sangre.count()) === 0) {
    await db.tipo_sangre.bulkCreate(data);
  }
};

export default handleCreate;
