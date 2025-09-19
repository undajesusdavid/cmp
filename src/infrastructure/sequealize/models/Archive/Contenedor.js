import { DataTypes } from "sequelize";

const Container = (sequelize) => {
  
  return sequelize.define("Contenedor",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      ubicacion: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      ejercicio: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
    },
    {
      timestamps: false,
      tableName: "arch_contenedor",
    }
  );
};

export default Container;
