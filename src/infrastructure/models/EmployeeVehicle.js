import { DataTypes } from "sequelize";

const EmployeeVehicle = (sequelize) => {
  return sequelize.define(
    "vehiculo_empleado",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
      },
      marca: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      modelo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      anio: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
    },
    {
      timestamps: false,
      tableName: "vehiculo_empleado",
    }
  );
};

export default EmployeeVehicle;