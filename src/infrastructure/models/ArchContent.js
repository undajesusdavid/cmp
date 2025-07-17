import { DataTypes } from "sequelize";

const ArchContent = (sequelize) => {
  
  return sequelize.define("inventario_contenido",
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
    },
      {
      timestamps: false,
      tableName: "inventario_contenido"
    }
  );
};

export default ArchContent;
