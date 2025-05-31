import { Router } from "express";
import authenticateToken from "../middleware/auth.js";

const PermissionApi = (db) => {
  const Permission = db.permisos;
  const router = Router();
  const include = [
    {
      association: "usuarios",
      attributes: ["id", "username"],
      through: { attributes: [] },
    },
    {
      association: "roles",
      attributes: ["id", "nombre"],
      through: { attributes: [] },
    },
  ];

  router.get("/api/permission/list", authenticateToken, async (req, res) => {
    const permisos = await Permission.findAll({ include });
    res.json(permisos);
  });

  router.get("/api/permission/get", authenticateToken, async (req, res) => {
    const id = req.query.id;
    const permiso = await Permission.findOne({ where: { id: id }, include });
    res.json(permiso);
  });

  router.post(
    "/api/permission/register",
    authenticateToken,
    async (req, res) => {
      const data = req.body;
      const newPer = Permission.create({
        nombre: data.nombre,
        descripcion: data.descripcion,
      });
      res.json(newPer);
    }
  );

  return router;
};

export default PermissionApi;
