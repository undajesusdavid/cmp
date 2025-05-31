import bcrypt from "bcryptjs";

const hasPassword = async (password) => {
  // Hashear la contraseña
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const data = [
  {
    id: "16a1c007-a97c-47fe-9323-da6253174e61",
    username: "undajesusdavid@gmail.com",
    password: await hasPassword("Megansusej95*"),
  },
];

const handleCreate = async (db) => {
  if ((await db.usuarios.count()) === 0) {
    await db.usuarios.bulkCreate(data);
  }
};

export default handleCreate;
