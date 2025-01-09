import { sequelize } from "../database/sequelize.js";
import { DataTypes} from "sequelize";


// Modelo de usuario
export const CondHousing = sequelize.define("condicion_viviendas", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  },
  condicion: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  }
  
},{
    timestamps: false,
});