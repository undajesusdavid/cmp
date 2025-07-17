import { DataTypes } from "sequelize";

const ArchDocumentaryInventory = (sequelize) => {
  
  return sequelize.define("inventario_documental",
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
      ubicacion: {
        type: DataTypes.STRING,
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
      tableName: "inventario_documental"
    }
  );
};

export default ArchDocumentaryInventory;
