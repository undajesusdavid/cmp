import { sequelize } from "../database/sequelize.js";
import { DataTypes} from "sequelize";


// Modelo de usuario
export const AcademicLevel = sequelize.define("niveles_academicos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  },
  nivel: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  }
  
},{
    timestamps: false,
});