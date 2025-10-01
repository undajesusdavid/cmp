import { Router } from "express";
import bcrypt from "bcryptjs";
import { AuthController } from "../../../controllers/auth/AuthController.js";


const router = Router();

const AuthApi = (sequelize) => {
  const authController = new AuthController(sequelize);

  const db = sequelize.models;
  const User = db.usuarios;

  router.post("/api/login", async (req, res) => {
    try {
      await authController.authenticate(
        req.body.username,
        req.body.password,
        (token, payload) => {
          res.json({ token, ...payload });
        }
      );
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  });

  router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Se requiere nombre de usuario y contraseña." });
    }

    const user = User.findOne({
      where: { username: username },
    });

    // Verificar si el usuario ya existe
    if (user) {
      return res
        .status(409)
        .json({ message: "El nombre de usuario ya existe." });
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

      res.status(201).json({
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

  return router;
};

export default AuthApi;
