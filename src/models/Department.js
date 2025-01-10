import { sequelize } from "../database/sequelize.js";
import { DataTypes} from "sequelize";


// Modelo de usuario
export const Department = sequelize.define("departamentos", {
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