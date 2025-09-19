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
      cod_serie: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      cod_subserie: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      serie: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      subserie: {
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
