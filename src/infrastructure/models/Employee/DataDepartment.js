import { DataTypes } from "sequelize";

const DataDepartment = (sequelize) => {
  return sequelize.define(
    "departamentos",
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
      nomenclatura: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: false,
      tableName: "departamentos",
    }
  );
};

export default DataDepartment;
