import { sequelize } from "../database/sequelize.js";
import { DataTypes } from "sequelize";
import Permission from "./Permission.js";
import Role from "./Role.js";

export const RolePermission = sequelize.define("roles_permisos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  },
});

Role.belongsToMany(Permission, { through: RolePermission, foreignKey: "role_id", as: "permisos" });
Permission.belongsToMany(Role, { through: RolePermission, foreignKey: "permission_id", as: "roles" });

export default RolePermission;
