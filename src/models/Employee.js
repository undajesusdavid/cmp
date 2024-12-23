import { orm } from "../config/orm.js";
import { DataTypes} from "sequelize";

// Modelo de usuario
export const Employee = orm.define("employees", {
  id: {
    primaryKey: true,
    autoIncrementIdentity:true,
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
  },
  cedula: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genero: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
