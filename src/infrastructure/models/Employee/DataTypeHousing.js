import { DataTypes } from "sequelize";

const DataTypeHousing = (sequelize) => {
  
  return sequelize.define("tipo_viviendas",
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
      tableName: "tipo_viviendas"
    }
  );
};

export default DataTypeHousing;
