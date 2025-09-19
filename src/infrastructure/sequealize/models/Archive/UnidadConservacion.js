import { DataTypes } from "sequelize";

const ArchConservationUnit= (sequelize) => {
  
  return sequelize.define("UnidadConservacion",
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
    },
    {
      timestamps: false,
      tableName: "arch_unidad_conservacion",
    }
  );
};

export default ArchConservationUnit;
