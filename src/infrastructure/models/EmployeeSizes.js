import { DataTypes } from "sequelize";

const EmployeeSizes = (sequelize) => {
  return sequelize.define(
    "tallas_empleado",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
      },
      pantalon: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      camisa: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      zapato: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
    },
    {
      timestamps: false,
      tableName: "tallas_empleado"
    }
  );
};


export default EmployeeSizes;