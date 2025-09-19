import { Router } from "express";
import authenticateToken from "../../middleware/auth.js";

const UnidadConservacionApi = (sequelize) => {
  const router = Router();
  const db = sequelize.models;
  const Unidad = db.UnidadConservacion;

  router.get(
    "/api/archivo/unidad_conservacion/list",
    authenticateToken,
    async (req, res) => {
      const unidades = await Unidad.findAll();
      res.json(unidades);
    }
  );

  return router;
};

export default UnidadConservacionApi;
