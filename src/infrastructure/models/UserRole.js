import { sequelize } from "../database/sequelize.js";
import { DataTypes } from "sequelize";
import User from "./User.js";
import Role from "./Role.js";

const UserRole = sequelize.define("usuarios_roles", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  },
});

User.belongsToMany(Role, { through: UserRole, foreignKey: "user_id", as: "roles" });
Role.belongsToMany(User, { through: UserRole, foreignKey: "role_id", as: "users" });

export default UserRole;
