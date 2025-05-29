import { Router } from "express";
import authenticateToken from "../middleware/auth.js";
import Permission from "../models/Permission.js";

const PermissionApi = Router();

PermissionApi.get("/api/permission/list", authenticateToken, async (req, res) => {
  const permisos = await Permission.findAll();
  res.json(permisos);
});

PermissionApi.get("/api/permission/get", authenticateToken, async (req, res) => {
  const id = req.query.id;
  const permiso = await Permission.findOne({ where: { id: id } });
  res.json(permiso);
});

PermissionApi.post("/api/permission/register", authenticateToken, async (req, res) => {
  const data = req.body;
  const newPer = Permission.create({
    nombre: data.nombre,
    descripcion: data.descripcion,
  });
  res.json(newPer);
});

export default PermissionApi;
