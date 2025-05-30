import { sequelize } from "../database/sequelize.js";
import { DataTypes } from "sequelize";
import {Employee} from "./Employee.js"

const User = sequelize.define("usuarios", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    unique: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
});

User.belongsTo(Employee, {
  foreignKey: "empleado_id",
  allowNull: true,
  unique: true,
  as: "empleado",
});
Employee.hasOne(User, { foreignKey: "empleado_id", as: "usuario" });


export default User;