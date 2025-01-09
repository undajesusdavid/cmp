import { sequelize } from "../database/sequelize.js";
import { DataTypes} from "sequelize";
import { Nationality } from "./Nationality.js";

// Modelo de usuario
export const Employee = sequelize.define("empleados", {
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
  fecha_nac: {
    type: DataTypes.DATE,
    allowNull: false, 
  },
  nacionalidadId: {
    type: DataTypes.INTEGER,
    allowNull: false, 
  }
});

Employee.belongsTo(Nationality)