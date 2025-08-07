import { Router } from "express";
import authenticateToken from "../../middleware/auth.js";

const ElementoApi = (db) => {
  const router = Router();

  // Modelos
  const Elemento = db.ElementoArchivado;
  //const Expediente = db.Expediente;
  //const Contenedor = db.Contenedor;

  // Rutas
  router.get(
    "/api/archivo/inventario/list",
    authenticateToken,
    async (req, res) => {
      const items = await Elemento.findAll({
        include: [
          { model: db.Clasificacion, as: "clasificacion" },
          { model: db.Contenedor, as: "contenedor" },
        ],
      });
      res.json(items);
    }
  );

  router.get(
    "/api/archivo/inventario/get",
    authenticateToken,
    async (req, res) => {
      const id = req.query.id;
      const item = await Elemento.findOne({
        where: { id: id },
      });
      const record = await item.getExpediente({
        include: [{ model: Elemento, as: "elementos" }],
      });
      const container = await item.getContenedor();
      res.json({ record, container, item });
    }
  );

  router.post(
    "/api/archivo/inventario/register",
    authenticateToken,
    async (req, res) => {
      const data = req.body;
      const newItem = await Elemento.create({
        codigo: data.codigo,
        titulo: data.titulo,
        ejercicio_fiscal: data.ejercicio_fiscal,
        soporte: data.soporte,
        observacion: data.observacion,
        clasificacion_id: data.clasificacion_id,
      });

      res.json(newItem);
    }
  );

  return router;
};

export default ElementoApi;
