import { sequelize } from "../database/sequelize.js";
import { DataTypes } from "sequelize";
import { Employee } from "./Employee.js";

// Modelo de vheiculo
export const EmployeeVehicle = sequelize.define(
  "vehiculo_empleado",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    anio: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
  },
  {
    timestamps: false,
    tableName: "vehiculo_empleado",
  }
);

EmployeeVehicle.belongsTo(Employee, {
  foreignKey: { name: "empleado_id", unique: true },
});
Employee.hasMany(EmployeeVehicle, { foreignKey: "empleado_id", as: "vehiculos" });
