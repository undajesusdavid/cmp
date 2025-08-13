import { DataTypes } from "sequelize";

const Record = (sequelize) => {
  
  return sequelize.define("Expediente",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
      },
      codigo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
       ejercicio_fiscal:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
     
    },
      {
      timestamps: false,
      tableName: "arch_expediente",
    }
  );
};

export default Record;
