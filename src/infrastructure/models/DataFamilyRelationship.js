import { DataTypes } from "sequelize";

const DataFamilyRelationship = (sequelize) => {
  return sequelize.define("parentesco_familiar",
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
      tableName: "parentesco_familiar",
    }
  );
};

export default DataFamilyRelationship;
