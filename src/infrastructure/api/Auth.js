import { Router } from "express";
import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const AuthApi = Router();

AuthApi.post("/api/login", async (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Se requiere nombre de usuario y contraseña." });
  }

  // Buscar el usuario
  const user = await User.findOne({
    where: { username: username},
  });
  if (!user) {
    return res.status(400).json({ message: "Credenciales inválidas." });
  }

  try {
    // Comparar la contraseña proporcionada con la contraseña hasheada
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch)
    if (!isMatch) {
      return res.status(400).json({ message: "Credenciales inválidas." });
    }

    // Generar el JSON Web Token
    // El payload del token DEBE ser información no sensible y suficiente para identificar al usuario.
    // NO incluyas la contraseña hasheada aquí.
    const payload = {
      user: {
        id: user.id,
        username: user.username,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET, // Clave secreta del archivo .env
      { expiresIn: "1h" }, // El token expira en 1 hora
      (err, token) => {
        if (err) throw err;
        res.json({ token, ...payload}); // Envía el token al cliente
      }
    );
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error en el servidor al iniciar sesión." });
  }
});

AuthApi.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Se requiere nombre de usuario y contraseña." });
  }

  const user = User.findOne({
    where: { username: username},
  });

  // Verificar si el usuario ya existe
  if (user) {
    return res.status(409).json({ message: "El nombre de usuario ya existe." });
  }

  try {
    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      id: users.length + 1,
      username,
      password: hashedPassword,
    };
    users.push(newUser);

    res
      .status(201)
      .json({
        message: "Usuario registrado exitosamente.",
        user: { id: newUser.id, username: newUser.username },
      });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error en el servidor al registrar usuario." });
  }
});

export default AuthApi;
