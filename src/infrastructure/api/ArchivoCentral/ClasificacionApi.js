import { Router } from "express";
import authenticateToken from "../../middleware/auth.js";

const ClasificacionApi = (db) => {
  const router = Router();
  const Model = db.Clasificacion;

  router.get(
    "/api/archivo/clasificacion/list",
    authenticateToken,
    async (req, res) => {
      const clasificaciones = await Model.findAll({
        include: [{ model: db.departamentos, as: "departamento" }],
      });
      res.json(clasificaciones);
    }
  );

  router.get(
    "/api/archivo/clasificacion/get",
    authenticateToken,
    async (req, res) => {
      const id = req.query.id;
      const clasificacion = await Model.findOne({
        where: { id: id },
        include,
      });
      res.json(clasificacion);
    }
  );

  router.post(
    "/api/archivo/clasificacion/register",
    authenticateToken,
    async (req, res) => {
      const data = req.body;
      const nuevaClasificacion = await Model.create({
        cod_serie: data.cod_serie,
        cod_subserie: data.cod_subserie,
        serie: data.serie,
        subserie: data.subserie,
        departamento_id: data.departamento_id,
      });

      res.json(nuevaClasificacion);
    }
  );

  return router;
};

export default ClasificacionApi;
