import { DataTypes } from "sequelize";

const ArchConservationUnit= (sequelize) => {
  
  return sequelize.define("unidad_conservacion",
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
    }
  );
};

export default ArchConservationUnit;
