import bcrypt from "bcryptjs";

const hasPassword = async (password) => {
  // Hashear la contraseña
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export default [
  {
    id:"16a1c007-a97c-47fe-9323-da6253174e61",
    username: "undajesusdavid@gmail.com",
    password: await hasPassword("Megansusej95*"),
  },
];
