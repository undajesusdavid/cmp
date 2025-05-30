import { Router } from "express";
import authenticateToken from "../middleware/auth.js";
import Role from "../models/Role.js";

const RolesApi = Router();

const include = [
  {
    association: "users",
    attributes: ["id", "username"],
    through: { attributes: [] },
  },
  {
    association: "permisos",
    attributes: ["id", "nombre"],
    through: { attributes: [] },
  },
];


RolesApi.get("/api/roles/list", authenticateToken, async (req, res) => {
  const roles = await Role.findAll({ include });
  res.json(roles);
});

RolesApi.get("/api/roles/get", authenticateToken, async (req, res) => {
  const id = req.query.id;
  const rol = await Role.findOne({ where: { id: id }, include });
  res.json(rol);
});

RolesApi.post("/api/roles/register", authenticateToken, async (req, res) => {
  const data = req.body;
  const newRol = Role.create({
    nombre: data.nombre,
    descripcion: data.descripcion,
  });
  res.json(newRol);
});

export default RolesApi;
