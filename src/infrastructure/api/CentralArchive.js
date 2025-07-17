import { Router } from "express";
import authenticateToken from "../middleware/auth.js";

const CentralArchiveApi = (db) => {
  const Content = db.inventario_contenido;
  const Inventory = db.inventario_documental;
  const router = Router();

  const include = [
    {
      association: "contenido",
      attributes: ["id", "descripcion"],
      //through: { attributes: [] },
    },
    {
      association: "unidad_conservacion",
      attributes: ["id", "nombre"],
      //through: { attributes: [] },
    },
  ];

  router.get(
    "/api/archivo/inventario/list",
    authenticateToken,
    async (req, res) => {
      const inventario_documental = await Inventory.findAll({ include });
      res.json(inventario_documental);
    }
  );

  router.get(
    "/api/archivo/inventario/get",
    authenticateToken,
    async (req, res) => {
      const id = req.query.id;
      const item_inventario = await Inventory.findOne({
        where: { id: id },
        include,
      });
      res.json(item_inventario);
    }
  );

  router.post(
    "/api/archivo/inventario/register",
    authenticateToken,
    async (req, res) => {
      const data = req.body;
      const inventario = await Inventory.create({
        codigo: data.codigo,
        titulo: data.titulo,
        ubicacion: data.ubicacion,
        observacion: data.observacion,
        unidad_conservacion_id: data.unidad_conservacion,
      });

      data.contenido.forEach(async (element) => {
        await Content.create({
          descripcion: element.descripcion,
          inventario_id: inventario.id,
        });
      });

      res.json(inventario);
    }
  );

  return router;
};

export default CentralArchiveApi;
