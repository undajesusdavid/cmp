import { Router } from "express";
import { Employee } from "../models/Employee.js";
import { EmployeeSizes } from "../models/EmployeeSizes.js";
import { EmployeeFamily } from "../models/EmployeeFamily.js";
import { EmployeeVehicle } from "../models/EmployeeVehicle.js";
import { User } from "../models/User.js";
import authenticateToken from "../middleware/auth.js";
import bcrypt from "bcryptjs";

const EmployeeApi = Router();

EmployeeApi.get("/api/employee/list", authenticateToken, async (req, res) => {
  const employees = await Employee.findAll({
    include: ["cargo", "departamento"],
  });

  res.json(employees);
});

EmployeeApi.get("/api/employee/get", authenticateToken, async (req, res) => {
  const id = req.query.id;
  const employee = await Employee.findOne({
    where: { id: id },
    include: [
      "nacionalidad",
      "tipo_vivienda",
      "cond_vivienda",
      "tipo_sangre",
      "nivel_academico",
      "profesion",
      "tipo_personal",
      "cargo",
      "departamento",
      "vehiculos",
      "usuario",
      {
        association: "familiares",
        include: ["parentesco"],
      },
      {
        association: "tallas",
        attributes: ["id", "zapato", "camisa", "pantalon"],
      },
    ],
  });
  res.json(employee);
});

EmployeeApi.post(
  "/api/employee/register",
  authenticateToken,
  async (req, res) => {
    // Create a new employee
    const data = req.body;
    console.log(data);

    const employee = await Employee.create({
      cedula: data.cedula,
      rif: data.rif,
      nombre: data.nombre,
      apellido: data.apellido,
      genero: data.genero,
      fecha_nac: Date(data.fecha_nac),
      lugar_nac: data.lugar_nac,
      altura: parseFloat(data.altura),
      peso: parseFloat(data.peso),
      estado_civil: data.estado_civil,
      num_hijos: parseInt(data.num_hijos),
      dir_habitacion: data.dir_habitacion,
      correo: data.correo,
      tlf_habitacion: data.tlf_habitacion,
      tlf_movil: data.tlf_movil,
      fec_ingreso_admin_pub: Date(data.fec_ingreso_admin_pub),
      fec_ingreso_inst: Date(data.fec_ingreso_inst),
      conadpis: data.conadpis,
      tiene_carnet_patria: data.tiene_carnet_patria,
      codigo_carnet_patria: data.codigo_carnet_patria,
      serial_carnet_patria: data.serial_carnet_patria,

      nacionalidad_id: data.nacionalidad_id,
      nivel_academico_id: data.nivel_academico_id,
      profesion_id: data.profesion_id,
      tipo_personal_id: data.tipo_personal_id,
      cargo_id: data.cargo_id,
      dir_adscrita_id: data.dir_adscrita_id,
      tipo_vivienda_id: data.tipo_vivienda_id,
      condicion_vivienda_id: data.condicion_vivienda_id,
      tipo_sangre_id: data.tipo_sangre_id,
    });

    await EmployeeSizes.create({
      empleado_id: employee.getDataValue("id"),
      pantalon: data.pantalon,
      camisa: data.camisa,
      zapato: data.zapato,
    });

    /*
    if (data.familiares.lenght > 0) {
      data.familiares.forEach(async (fam) => {
        await EmployeeFamily.create({
          empleado_id: employee.getDataValue("id"),
          parentesco_id: fam.parentesco_id,
          nombre: fam.nombre,
          apellido: fam.apellido,
          cedula: fam.cedula,
          fec_nac: fam.fec_nac,
        });
      });
    }*/

    /*data.vehiculos.forEach(async (veh) => {
      await EmployeeVehicle.create({
        empleado_id: employee.getDataValue("id"),
        marca: veh.marca,
        modelo: veh.modelo,
        anio: veh.anio,
        color: veh.color,
      });
    });

    await User.create({
      username: username,
      password: await bcrypt.hash(password, 10),
      empleado_id: employee.getDataValue("id"),
    });*/

    res.json(employee);
  }
);

export default EmployeeApi;
