import { Router } from "express";
import authenticateToken from "../../middleware/auth.js";

const ExpedienteApi = (db) => {
  const router = Router();

  //Modelos
  const Expediente = db.Expediente;
  
  //Rutas
  router.get(
    "/api/archivo/expediente/list",
    authenticateToken,
    async (req, res) => {
      const records = await Expediente.findAll({
        include: [{model: db.ElementoArchivado, as: "elementos"}]
      })
      res.json(records);
    }
  );

  router.get(
    "/api/archivo/expediente/get",
    authenticateToken,
    async (req, res) => {
      const id = req.query.id;
      const record = await Expediente.findOne({
        where: { id: id },
        include,
      });
      res.json(record);
    }
  );

  router.post(
    "/api/archivo/expediente/register",
    authenticateToken,
    async (req, res) => {
      const data = req.body;
      const record = await Expediente.create({});
      res.json(item);
    }
  );

  return router;
};

export default ExpedienteApi;
