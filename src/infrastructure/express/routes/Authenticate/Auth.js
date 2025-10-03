import { Router } from "express";
import { AuthController } from "../../../adapters/controllers/AuthController.js";
import { container } from "../../../config/contenedorTsyringe.js";

const router = Router();

const userAuth = container.resolve("UserAuth");
const authController = new AuthController(userAuth);

const AuthApi = (sequelize) => {
  router.post("/api/login", async (req, res) => {
    try {
      const result = await authController.authenticate(
        req.body.username,
        req.body.password
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(401).json({ message: "Error desde la ruta = "+error.message });
    }
  });

  return router;
};

export default AuthApi;
