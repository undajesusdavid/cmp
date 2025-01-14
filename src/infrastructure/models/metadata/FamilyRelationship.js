import { sequelize } from "../../database/sequelize.js";
import { DataTypes} from "sequelize";

// Parentesco familiar
const FamilyRelationship = sequelize.define("parentesco_familiar", {
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
  }
  
},{
    timestamps: false,
    tableName: "parentesco_familiar"
});

export default FamilyRelationship;