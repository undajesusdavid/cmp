import { sequelize } from "../../database/sequelize.js";
import { DataTypes} from "sequelize";


// Modelo de usuario
export const Profession = sequelize.define("profesiones", {
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