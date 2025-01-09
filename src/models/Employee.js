import { sequelize } from "../database/sequelize.js";
import { DataTypes } from "sequelize";
import { Nationality } from "./Nationality.js";
import { TypeHousing } from "./TypeHousing.js";
import { CondHousing } from "./CondHousing.js";
import { BloodType } from "./BloodType.js";

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
});

Employee.belongsTo(Nationality, { foreignKey: "nacionalidad_id" });
Employee.belongsTo(TypeHousing, { foreignKey: "tipo_vivienda_id" });
Employee.belongsTo(CondHousing, { foreignKey: "condicion_vivienda_id" });
Employee.belongsTo(BloodType, { foreignKey: "tipo_sangre_id" });
