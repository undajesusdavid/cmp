import { DataTypes } from "sequelize";

const User = (sequelize) => {

  return sequelize.define("usuarios", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
  }, {
    tableName: 'usuarios',
  });
};

export default User;
