import { Router } from "express";
import { Employee } from "../models/Employee.js";
import { Nationality } from "../models/Nationality.js";
import { CondHousing } from "../models/CondHousing.js";
import { TypeHousing } from "../models/TypeHousing.js";
import { BloodType } from "../models/BloodType.js";
import { AcademicLevel } from "../models/AcademicLevel.js";
import { Profession } from "../models/Profession.js";
import { StaffType } from "../models/StaffType.js";
import { JobPosition } from "../models/JobPosition.js";
import { Department } from "../models/Department.js";
import { EmployeeSizes } from "../models/EmployeeSizes.js";

const EmployeeApi = Router();

EmployeeApi.get("/api/employee/list", async (req, res) => {
  const employees = await Employee.findAll({
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
      {
        association: "tallas",
        attributes: ["id","zapato", "camisa", "pantalon"]
      },
    ],
  });

  const tallas = await EmployeeSizes.findAll({
    include: [{model: Employee, attributes: ["cedula","nombre","apellido"]}],
  });
  res.json({employees,tallas});
});

EmployeeApi.get("/api/employee/registrar", async (req, res) => {
  // Create a new employee
  const jesus = await Employee.create({
    cedula: "V25606211",
    rif: "V25606211-5",
    nombre: "Jesus",
    apellido: "Unda",
    genero: "M",
    estado_civil: "S",
    num_hijos: 0,
    lugar_nac: "ACARIGUA",
    fecha_nac: "1995-03-12",
    altura: 1.8,
    peso: 72.0,
    dir_habitacion:
      "Urb. Los cortijos sector 9 vereda 19 casa nro 03 Acarigua Portuguesa",
    tlf_habitacion: "0255-1573837",
    tlf_movil: "0412-5265934",
    correo: "undajesusdavid@gmail.com",
    fec_ingreso_admin_pub: "2023-04-15",
    fec_ingreso_inst: "2024-05-30",
    conadpis: false,
    tiene_carnet_patria: true,
    codigo_carnet_patria: "9658362",
    serial_carnet_patria: "0010619816",
    nacionalidad_id: "1",
    tipo_vivienda_id: "1",
    condicion_vivienda_id: "1",
    tipo_sangre_id: "1",
    nivel_academico_id: "3",
    profesion_id: "6",
    tipo_personal_id: "12",
    cargo_id: "9",
    dir_adscrita_id: "8",
  });

  await EmployeeSizes.create({
    empleado_id: jesus.getDataValue("id"),
    pantalon: "30",
    camisa:"M",
    zapato: "42"
  })

  console.log("jesus's auto-generated ID:", jesus.id);
  res.json("Empleado registrado");
});

export default EmployeeApi;
