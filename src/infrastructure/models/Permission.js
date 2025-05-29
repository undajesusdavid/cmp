import { sequelize } from "../database/sequelize.js";
import { DataTypes } from "sequelize";

export const Permission = sequelize.define("permisos", {
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
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
});

/*User.belongsTo(Employee, {
  foreignKey: "empleado_id",
  allowNull: true,
  unique: true,
  as: "empleado",
});
Employee.hasOne(User, { foreignKey: "empleado_id", as: "usuario" });*/

export default Permission;
