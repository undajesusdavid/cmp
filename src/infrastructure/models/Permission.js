import { sequelize } from "../database/sequelize.js";
import { DataTypes } from "sequelize";

export const Permission = sequelize.define("permisos", {
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


export default Permission;
