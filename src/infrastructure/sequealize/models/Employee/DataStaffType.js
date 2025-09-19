import { DataTypes } from "sequelize";

const DataStaffType = (sequelize) => {
  return sequelize.define("tipo_personal",
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
      tableName: "tipo_personal"
    }
  );
};

export default DataStaffType;
