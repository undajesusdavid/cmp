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
        allowNull: false,
        unique: false,
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      numero_pieza: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
        unique: false,
      },
      observacion: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
    },
    {
      timestamps: false,
      tableName: "arch_elemento_archivado",
    }
  );
};

export default ArchDocumentaryInventory;
