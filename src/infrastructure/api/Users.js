import { Router } from "express";
import authenticateToken from "../middleware/auth.js";
import HashPassword from "../utils/HashPassword.js";

const UserApi = (db) => {
  const User = db.usuarios;
  const Role = db.roles;
  const Permission = db.permisos;

  const router = Router();

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

  router.get("/api/user/list", authenticateToken, async (req, res) => {
    const users = await User.findAll({ include, attributes });
    res.json(users);
  });

  router.get("/api/user/get", authenticateToken, async (req, res) => {
    const id = req.query.id;
    const user = await User.findOne({ where: { id: id }, include, attributes });
    res.json(user);
  });

  router.delete("/api/user/delete", authenticateToken, async (req, res) => {
    const id = req.params.id;
    const status = false;
    try {
      await User.destroy({ where: { id: id } });
      status = true;
    } catch (error) {}

    return status;
  });

  router.post("/api/user/register", authenticateToken, async (req, res) => {
    const data = req.body;
    const user = await User.create({
      username: data.username,
      password: await HashPassword(data.password),
      employee_id: data.employee_id,
    });

    data.roles.forEach(async (roleId) => {
      const role = await Role.findByPk(roleId);
      if (role) {
        await user.addRole(role);
      } else {
        console.warn(`Rol con ID ${roleId} no encontrado. No se pudo asignar.`);
      }
    });

    data.permissions.forEach(async (permissionId) => {
      const permission = await Permission.findByPk(permissionId);

      if (permission) {
        await user.addPermiso(permission);
      } else {
        console.warn(
          `Permiso con ID ${permissionId} no encontrado. No se pudo asignar.`
        );
      }
    });

    res.json(user);
  });

  return router;
};

export default UserApi;
