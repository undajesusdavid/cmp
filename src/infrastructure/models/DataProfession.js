import { DataTypes } from "sequelize";

const DataProfession = (sequelize) => {
  return sequelize.define("profesiones",
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
      tableName: "profesiones"
    }
  );
};


export default DataProfession;