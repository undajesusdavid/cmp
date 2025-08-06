import { DataTypes } from "sequelize";

const ArchDocumentaryInventory = (sequelize) => {
  return sequelize.define(
    "ElementoArchivado",
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
        allowNull: true,
        unique: false,
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      ejercicio_fiscal: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      numero_carpeta: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false,
      },
      observacion: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
      },
    },
    {
      timestamps: false,
      tableName: "arch_elementos",
    }
  );
};

export default ArchDocumentaryInventory;
