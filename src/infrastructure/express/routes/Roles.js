import { Router } from "express";
import authenticateToken from "../middleware/auth.js";

const RolesApi = (sequelize) => {
  const db = sequelize.models;
  const Role = db.roles;
  const router = Router();
  const include = [
    {
      model: db.usuarios,
      as: "usuarios",
      attributes: ["id", "username"],
      through: { attributes: [] },
    },
    {
      model: db.permisos,
      as: "permisos",
      attributes: ["id", "nombre"],
      through: { attributes: [] },
    },
  ];

  router.get("/api/roles/list", authenticateToken, async (req, res) => {
    const roles = await Role.findAll({ include });
    res.json(roles);
  });

  router.get("/api/roles/get", authenticateToken, async (req, res) => {
    const id = req.query.id;
    const rol = await Role.findOne({ where: { id: id }, include });
    res.json(rol);
  });

  router.post("/api/roles/register", authenticateToken, async (req, res) => {
    const data = req.body;
    const newRol = Role.create({
      nombre: data.nombre,
      descripcion: data.descripcion,
    });
    res.json(newRol);
  });

  return router;
};

export default RolesApi;
