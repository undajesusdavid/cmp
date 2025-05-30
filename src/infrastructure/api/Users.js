import { Router } from "express";
import authenticateToken from "../middleware/auth.js";
import HashPassword from "../utils/HashPassword.js";
import User from "../models/User.js";
import Role from "../models/Role.js";
import Permission from "../models/Permission.js";

const UserApi = Router();

const attributes = {
  exclude: ["password", "empleado_id"],
};

const include = [
  {
    association: "permisos",
    attributes: ["id", "nombre"],
    through: { attributes: [] },
  },
  {
    association: "roles",
    attributes: ["id", "nombre", "descripcion"],
    through: { attributes: [] },
  },
  {
    association: "empleado",
    attributes: ["id", "nombre", "cedula"],
  },
];

UserApi.get("/api/user/list", authenticateToken, async (req, res) => {
  const users = await User.findAll({ include, attributes });
  res.json(users);
});

UserApi.get("/api/user/get", authenticateToken, async (req, res) => {
  const id = req.query.id;
  const user = await User.findOne({ where: { id: id }, include, attributes });
  res.json(user);
});

UserApi.post("/api/user/register", authenticateToken, async (req, res) => {
  const data = req.body;
  const user = await User.create({
    username: data.username,
    password: await HashPassword(data.password),
    employee_id: data.employee_id,
  });

  /*data.roles.forEach(async (roleId) => {
    const role = await Role.findByPk(roleId)
    if (role) {
      await role.addUser(user);
    } else {
      console.warn(`Rol con ID ${roleId} no encontrado. No se pudo asignar.`);
    }
  });*/

  /*data.permissions.forEach(async (permissionId) => {
    const permission = await Permission.findByPk(permissionId);
 
    if (permission) {
      await user.addPermission(permission); 
    } else {
      console.warn(
        `Permiso con ID ${permissionId} no encontrado. No se pudo asignar.`
      );
    }
  });
*/
  res.json(user);
});

export default UserApi;
