import { Router } from "express";
import authenticateToken from "../../middleware/auth.js";

const ContenedorApi = (db) => {
  const router = Router();

  const Contenedor = db.Contenedor;

  router.get(
    "/api/archivo/contenedor/list",
    authenticateToken,
    async (req, res) => {
      const containers = await Contenedor.findAll({ include });
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
        include,
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
        codigo: data.codigo,
        titulo: data.titulo,
        observacion: data.observacion,
      });

      res.json(newContainer);
    }
  );

  return router;
};

export default ContenedorApi;
