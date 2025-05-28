import bcrypt from "bcryptjs";

const hasPassword = async (password) => {
  // Hashear la contraseña
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export default [
  {
    username: "undajesusdavid@gmail.com",
    password: await hasPassword("Megansusej95*"),
  },
];
