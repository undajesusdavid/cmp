import { sequelize } from "../database/sequelize.js";
import { DataTypes } from "sequelize";
import {Nationality} from "./metadata/Nationality.js";
import TypeHousing from "./metadata/TypeHousing.js";
import CondHousing from "./metadata/CondHousing.js";
import { BloodType } from "./metadata/BloodType.js";
import { AcademicLevel } from "./metadata/AcademicLevel.js";
import { Profession } from "./metadata/Profession.js";
import { StaffType } from "./metadata/StaffType.js";
import { JobPosition } from "./metadata/JobPosition.js";
import { Department } from "./metadata/Department.js";
// Modelo de usuario
export const Employee = sequelize.define("empleados", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    unique: true,
  },
  cedula: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  rif: {
    type: DataTypes.STRING,
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
  fecha_nac: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  lugar_nac: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  altura: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  peso: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  estado_civil: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  num_hijos: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  dir_habitacion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tlf_habitacion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tlf_movil: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fec_ingreso_admin_pub: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fec_ingreso_inst: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  conadpis: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  tiene_carnet_patria: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  codigo_carnet_patria: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  serial_carnet_patria: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

Employee.belongsTo(Nationality, {
  foreignKey: "nacionalidad_id",
  as: "nacionalidad",
});
Employee.belongsTo(TypeHousing, {
  foreignKey: "tipo_vivienda_id",
  as: "tipo_vivienda",
});
Employee.belongsTo(CondHousing, {
  foreignKey: "condicion_vivienda_id",
  as: "cond_vivienda",
});
Employee.belongsTo(BloodType, {
  foreignKey: "tipo_sangre_id",
  as: "tipo_sangre",
});
Employee.belongsTo(AcademicLevel, {
  foreignKey: "nivel_academico_id",
  as: "nivel_academico",
});
Employee.belongsTo(Profession, { foreignKey: "profesion_id", as: "profesion" });
Employee.belongsTo(StaffType, {
  foreignKey: "tipo_personal_id",
  as: "tipo_personal",
});
Employee.belongsTo(JobPosition, { foreignKey: "cargo_id", as: "cargo" });
Employee.belongsTo(Department, {
  foreignKey: "dir_adscrita_id",
  as: "departamento",
});
