import { DataTypes } from "sequelize";

const Clasificacion = (sequelize) => {
  
  return sequelize.define("Clasificacion",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
      },
      codigo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
    },
    {
      timestamps: false,
      tableName: "arch_clasificacion",
    }
  );
};

export default Clasificacion;
