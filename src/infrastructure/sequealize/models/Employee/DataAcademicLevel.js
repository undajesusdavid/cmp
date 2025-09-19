import { DataTypes } from "sequelize";

const DataAcademicLevel = (sequelize) => {
  return sequelize.define(
    "niveles_academicos",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
      },
      nivel: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: false,
      tableName: "niveles_academicos"
    }
  );
};


export default DataAcademicLevel;
