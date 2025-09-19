
import { DataTypes } from "sequelize";

const EmployeeFamily = (sequelize) => {
  return sequelize.define(
    "familia_empleado",
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
        unique: false,
      },
      apellido: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      cedula: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      fec_nac: {
        type: DataTypes.DATE,
        allowNull: false,
        unique: false,
      },
    },
    {
      timestamps: false,
      tableName: "familia_empleado",
    }
  );
};


export default EmployeeFamily;
