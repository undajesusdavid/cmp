import { sequelize } from "../database/sequelize.js";
import { DataTypes} from "sequelize";
import { Employee } from "./Employee.js";

// Modelo de usuario
export const Nationality = sequelize.define("nacionalidades", {
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
  }
  
},{
    timestamps: false,
});

Nationality.hasMany(Employee, {
  foreignKey: 'nacionalidadId'
});
