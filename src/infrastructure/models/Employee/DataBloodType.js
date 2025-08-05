import { DataTypes } from "sequelize";

const DataBloodType = (sequelize) => {
  return sequelize.define("tipo_sangre",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
      },
      tipo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: false,
      tableName: "tipo_sangre"
    }
  );
};

export default DataBloodType;
