import { Router } from "express";
import authenticateToken from "../../middleware/auth.js";

const ContenedorApi = (db) => {
  const router = Router();

  const Contenedor = db.Contenedor;

  router.get(
    "/api/archivo/contenedor/list",
    authenticateToken,
    async (req, res) => {
      const containers = await Contenedor.findAll({
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
      const updated = await Contenedor.update(data,{where: {id: data.id}});
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
