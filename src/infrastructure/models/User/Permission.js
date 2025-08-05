import { DataTypes } from "sequelize";

const Permission = (sequelize) => {
  return sequelize.define("permisos",
    {
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
    },
    {
      tableName: "permisos",
    }
  );
};

export default Permission;
