import { sequelize } from "../database/sequelize.js";
import { DataTypes } from "sequelize";
import { Employee } from "./Employee.js";
import FamilyRelationship from "./metadata/FamilyRelationship.js";

// Modelo de usuario
export const EmployeeFamily = sequelize.define(
  "familia_empleado",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    parentesco: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    cedula: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    fec_nac: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: false,
    },
  },
  {
    timestamps: false,
    tableName: "familia_empleado",
  }
);

EmployeeFamily.belongsTo(Employee, {
  foreignKey: "empleado_id",
  as: "empleado",
});
Employee.hasOne(EmployeeFamily, { foreignKey: "empleado_id", as: "familiares" });

EmployeeFamily.belongsTo(FamilyRelationship, {
  foreignKey: "parentesco_id",
  as: "parentescos",
});

FamilyRelationship.hasMany(EmployeeFamily, {
  foreignKey: "parentesco_id",
});
