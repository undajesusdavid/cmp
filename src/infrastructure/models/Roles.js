import { sequelize } from "../database/sequelize.js";
import { DataTypes } from "sequelize";
import User from "./User.js";

const Roles = sequelize.define("roles", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
});

/*Roles.belongsToMany(User, {
  as: "usuarios",
  through: "usuarios_roles",
  foreignKey: "rol_id",
});*/

export default Roles;
