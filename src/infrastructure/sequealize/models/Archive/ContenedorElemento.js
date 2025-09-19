import { DataTypes } from "sequelize";

const Container = (sequelize) => {
  
  return sequelize.define("ContenedorElemento",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
      }
    },
    {
      timestamps: true,
      tableName: "arch_contenedor_elemento",
    }
  );
};

export default Container;
