import { Router } from "express";
import authenticateToken from "../../middleware/auth.js";

const ClasificacionApi = (sequelize) => {
  const db = sequelize.models;
  const Model = db.Clasificacion;

  const router = Router();

  router.get(
    "/api/archivo/clasificacion/list",
    authenticateToken,
    async (req, res, next) => {
      const { departamento_id } = req.query;

      const whereClause = departamento_id
        ? { departamento_id: departamento_id } // Asegúrate de que este campo exista en tu modelo
        : {};

      try {
        const clasificaciones = await Model.findAll({
          where: whereClause,
          include: [{ model: db.departamentos, as: "departamento" }],
        });
        res.json(clasificaciones);
      } catch (error) {
        console.error("Error al obtener clasificaciones:", error);
        next();
      }
    }
  );

  router.get(
    "/api/archivo/clasificacion/get",
    authenticateToken,
    async (req, res) => {
      const id = req.query.id;
      const clasificacion = await Model.findOne({
        where: { id },
        include: [{ model: db.departamentos, as: "departamento" }],
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

  router.put(
    "/api/archivo/clasificacion/update",
    authenticateToken,
    async (req, res) => {
      const data = req.body;
      const updated = await Model.update(data, { where: { id: data.id } });
      res.json(updated);
    }
  );

  router.delete(
    "/api/archivo/clasificacion/delete",
    authenticateToken,
    async (req, res, next) => {
      const id = req.query.id;
      try {
        const fieldsDeleted = await Model.destroy({
          where: { id: id },
        });
        res.json(fieldsDeleted);
      } catch (error) {
        //console.error(error.stack)
        if (error instanceof Sequelize.ForeignKeyConstraintError) {
          next({
            message:
              "No se puede eliminar, la clasificación ya esta asignada a un elemento",
          });
        }
        next(error);
      }
    }
  );

  return router;
};

export default ClasificacionApi;
