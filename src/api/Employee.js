import { Router } from "express";
import { Employee } from "../models/Employee.js";
import { Nationality } from "../models/Nationality.js";
import { CondHousing } from "../models/CondHousing.js";
import { TypeHousing } from "../models/TypeHousing.js";
import { BloodType } from "../models/BloodType.js";

const EmployeeApi = Router();

EmployeeApi.get("/api/employee/list", async (req, res) => {
  const employees = await Employee.findAll({
    include: [Nationality, TypeHousing, CondHousing, BloodType],
   
  });
  res.json(employees);
});

EmployeeApi.get("/api/employee/registrar", async (req, res) => {
  // Create a new employee
  const jesus = await Employee.create({
    cedula: "25606211",
    nombre: "Jesus",
    apellido: "Unda",
    genero: "M",
    estado_civil: "S",
    lugar_nac: "ACARIGUA",
    fecha_nac: "1995-03-12",
    altura: "1.80 mts",
    peso: "72.0 kg",
    tlf_habitacion: "0255-1573837",
    tlf_movil: "0412-5265934",
    correo: "undajesusdavid@gmail.com",
    nacionalidad_id: "1",
    tipo_vivienda_id: "1",
    condicion_vivienda_id: "1",
    tipo_sangre_id: "1",
  });
  console.log("jesus's auto-generated ID:", jesus.id);
  res.json("Empleado registrado");
});

export default EmployeeApi;
