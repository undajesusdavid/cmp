import { DataTypes } from "sequelize";

const DataCondHousing = (sequelize) => {
  return sequelize.define(
    "condicion_viviendas",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
      },
      condicion: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: false,
      tableName: "condicion_viviendas"
    }
  );
};

export default DataCondHousing;
