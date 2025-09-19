import { Router } from "express";
import authenticateToken from "../../middleware/auth.js";

const DepartamentoApi = (sequelize) => {
  const db = sequelize.models;
  const Model = db.departamentos;

  const router = Router();
  router.get("/api/departamento/list", authenticateToken, async (req, res) => {
    const departamentos = await Model.findAll();
    res.json(departamentos);
  });

  return router;
};

export default DepartamentoApi;
