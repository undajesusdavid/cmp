import { DataTypes } from "sequelize";

const Employee = (sequelize) => {
  return sequelize.define("empleados",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
      },
      cedula: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      rif: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apellido: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      genero: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fecha_nac: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      lugar_nac: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      altura: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      peso: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      estado_civil: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      num_hijos: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      dir_habitacion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      correo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tlf_habitacion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tlf_movil: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fec_ingreso_admin_pub: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      fec_ingreso_inst: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      conadpis: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      tiene_carnet_patria: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      codigo_carnet_patria: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      serial_carnet_patria: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "empleados",
    }
  );
};



export default Employee;
