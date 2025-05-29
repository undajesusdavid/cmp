import { sequelize } from "../database/sequelize.js";
import { DataTypes } from "sequelize";
import User from "./User.js";
import Roles from "./Roles.js";

export const UsersRoles = sequelize.define("usuarios_roles", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  },
});

UsersRoles.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

UsersRoles.belongsTo(Roles, {
  foreignKey: "rol_id",
  as: "rol",
});

export default UsersRoles;
