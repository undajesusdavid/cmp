import { Router } from "express";
import { Employee } from "../models/Employee.js";

const EmployeeApi = Router();

EmployeeApi.get("/api/employee/list", async (req, res) => {
  const employees = await Employee.findAll();
  res.json(employees);
});

EmployeeApi.get("/api/employee/registrar", async (req, res) => {
  // Create a new employee
  const jesus = await Employee.create({
    id: "f9a8ab4b-b50c-4dc5-9c5b-68025652c94e",
    cedula: "2560621",
    nombre: "Jesus",
    apellido: "Unda",
    genero: "M",
    estado: "S",
  });
  console.log("jesus's auto-generated ID:", jesus.id);
  res.json("Empleado registrado");
});

export default EmployeeApi;
