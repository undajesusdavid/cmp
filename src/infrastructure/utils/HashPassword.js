import bcrypt from "bcryptjs";

const HashPassword = async (password) => {
  // Hashear la contraseña
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};


export default HashPassword;