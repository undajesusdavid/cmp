import { Router } from "express";
import authenticateToken from "../middleware/auth.js";
import Roles from "../models/Roles.js";

const RolesApi = Router();

RolesApi.get("/api/roles/list", authenticateToken, async (req, res) => {
  const roles = await Roles.findAll();
  res.json(roles);
});


RolesApi.get("/api/roles/get", authenticateToken, async (req, res) => {
  const id = req.query.id;
  const rol = await Roles.findOne({ where: { id: id } });
  res.json(rol);
});

RolesApi.post("/api/roles/register", authenticateToken, async (req, res) => {
  const data = req.body;
  const newRol = Roles.create({
    nombre: data.nombre,
    descripcion: data.descripcion
  });
  res.json(newRol);
});


export default RolesApi;