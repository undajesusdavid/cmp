import { DataTypes } from "sequelize";

const Role = (sequelize) => {
  return sequelize.define("roles", {
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
  },{
    tableName: "roles"
  });
};

export default Role;
