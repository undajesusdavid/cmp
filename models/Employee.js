import { DataTypes, Sequelize } from "sequelize";

// Conexión a la base de datos
const sequelize = new Sequelize("cmp", "postgres", "dbcmp-2024", {
  host: "localhost",
  dialect: "postgres",
});

// Modelo de usuario
export const Employee = sequelize.define("employees", {
  id: {
    primaryKey: true,
    autoIncrementIdentity:true,
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
  },
  cedula: {
    type: DataTypes.NUMBER,
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
});
