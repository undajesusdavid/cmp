import { Router } from "express";
import authenticateToken from "../../middleware/auth.js";

const UnidadConservacionApi = (db) => {
  const router = Router();

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
