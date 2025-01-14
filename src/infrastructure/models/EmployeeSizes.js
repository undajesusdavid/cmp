import { sequelize } from "../database/sequelize.js";
import { DataTypes } from "sequelize";
import { Employee } from "./Employee.js";

// Modelo de usuario
export const EmployeeSizes = sequelize.define(
  "tallas_empleado",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    pantalon: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    camisa: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    zapato: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
  },
  {
    timestamps: false,
    
  }
);

EmployeeSizes.belongsTo(Employee, { foreignKey: {name:"empleado_id", unique:true} });
Employee.hasOne(EmployeeSizes, { foreignKey: "empleado_id", as: "tallas" });
