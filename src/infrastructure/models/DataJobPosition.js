import { DataTypes } from "sequelize";

const DataJobPosition = (sequelize) => {
  return sequelize.define("cargos",
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
    },
    {
      timestamps: false,
      tableName: "cargos",
    }
  );
};

export default DataJobPosition;
