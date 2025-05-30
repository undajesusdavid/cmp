import { sequelize } from "../database/sequelize.js";
import { DataTypes } from "sequelize";
import Permission from "./Permission.js";
import User from "./User.js";

export const UserPermission = sequelize.define("usuarios_permisos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  },
});

User.belongsToMany(Permission, {
  through: UserPermission,
  foreignKey: "user_id",
  otherKey: "permission_id",
  as: "permisos",
});
Permission.belongsToMany(User, {
  through: UserPermission,
  foreignKey: "permission_id",
  otherKey: "user_id",
  as: "usuarios",
});

export default UserPermission;
