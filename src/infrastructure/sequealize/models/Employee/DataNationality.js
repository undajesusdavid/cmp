import { DataTypes } from "sequelize";

const DataNationality = (sequelize) => {
  return sequelize.define("nacionalidades",
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
      tableName: "nacionalidades"
    }
  );
};


export default DataNationality;