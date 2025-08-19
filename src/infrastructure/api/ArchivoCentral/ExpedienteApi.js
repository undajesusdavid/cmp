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
      const { departamento_id } = req.query;
      const whereClause = departamento_id
        ? { departamento_id: departamento_id } // Asegúrate de que este campo exista en tu modelo
        : {};

      const records = await Expediente.findAll({
        where: whereClause,
        include: [
          { model: db.ElementoArchivado, as: "elementos" },
          { model: db.departamentos, as: "departamento" },
        ],
      });
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
        include: [
          { model: db.ElementoArchivado, as: "elementos" },
          { model: db.departamentos, as: "departamento" },
        ],
      });
      res.json(record);
    }
  );

  router.post(
    "/api/archivo/expediente/register",
    authenticateToken,
    async (req, res) => {
      const data = req.body;
      const record = await Expediente.create({
        codigo: data.codigo,
        descripcion: data.descripcion,
        ejercicio_fiscal: data.ejercicio_fiscal,
        departamento_id: data.departamento_id,
        
      });
      res.json(record);
    }
  );

  router.put(
    "/api/archivo/expediente/update",
    authenticateToken,
    async (req, res) => {
      const data = req.body;
      const record = await Expediente.update(data, { where: { id: data.id } });
      res.json(record);
    }
  );

  router.delete(
    "/api/archivo/expediente/delete",
    authenticateToken,
    async (req, res) => {
      const id = req.query.id;
      try {
        await Expediente.destroy({
          where: { id: id },
        });
        res.json(true);
      } catch (error) {
        throw new Error(error.message);
      }
    }
  );

  return router;
};

export default ExpedienteApi;
