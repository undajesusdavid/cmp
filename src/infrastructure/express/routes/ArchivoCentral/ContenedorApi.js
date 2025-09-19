import { Router } from "express";
import authenticateToken from "../../middleware/auth.js";

const ContenedorApi = (sequelize) => {
  const db = sequelize.models;
  const Contenedor = db.Contenedor;

  const router = Router();

  router.get(
    "/api/archivo/contenedor/list",
    authenticateToken,
    async (req, res) => {
      const { departamento_id } = req.query;
      const whereClause =
        departamento_id && typeof departamento_id !== "object"
          ? { departamento_id: departamento_id } // Asegúrate de que este campo exista en tu modelo
          : {};
      const containers = await Contenedor.findAll({
        where: whereClause,
        include: [
          { model: db.UnidadConservacion, as: "unidad_conservacion" },
          { model: db.departamentos, as: "departamento" },
        ],
      });
      res.json(containers);
    }
  );

  router.get(
    "/api/archivo/contenedor/get",
    authenticateToken,
    async (req, res) => {
      const id = req.query.id;
      const container = await Contenedor.findOne({
        where: { id: id },
        include: [
          { model: db.UnidadConservacion, as: "unidad_conservacion" },
          { model: db.departamentos, as: "departamento" },
        ],
      });
      res.json(container);
    }
  );

  router.post(
    "/api/archivo/contenedor/register",
    authenticateToken,
    async (req, res) => {
      const data = req.body;
      const newContainer = await Contenedor.create({
        descripcion: data.descripcion,
        ubicacion: data.ubicacion,
        ejercicio: data.ejercicio,
        unidad_conservacion_id: data.unidad_conservacion_id,
        departamento_id: data.departamento_id,
      });

      res.json(newContainer);
    }
  );

  router.put(
    "/api/archivo/contenedor/update",
    authenticateToken,
    async (req, res) => {
      const data = req.body;
      const updated = await Contenedor.update(data, { where: { id: data.id } });
      res.json(updated);
    }
  );

  router.delete(
    "/api/archivo/contenedor/delete",
    authenticateToken,
    async (req, res) => {
      const id = req.query.id;
      try {
        await Contenedor.destroy({
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

export default ContenedorApi;
