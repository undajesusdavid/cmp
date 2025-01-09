import { sequelize } from "../database/sequelize.js";
import { DataTypes} from "sequelize";


// Modelo de usuario
export const TypeHousing = sequelize.define("tipo_viviendas", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  }
  
},{
    timestamps: false,
});