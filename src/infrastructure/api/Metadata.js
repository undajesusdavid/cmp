import { Router } from "express";
import authenticateToken from "../middleware/auth.js";

const MetadataApi = (db) => {
  const Department = db.departamentos;
  const JobPosition = db.cargos;
  const Nationality = db.nacionalidades;
  const Profession = db.profesiones;
  const StaffType = db.tipo_personal;
  const AcademicLevel = db.niveles_academicos;
  const BloodType = db.tipo_sangre;
  const TypeHousing = db.tipo_viviendas;
  const CondHousing = db.condicion_viviendas;
  const Employee = db.empleados;
  const Role = db.roles;
  const Permission = db.permisos;

  const router = Router();
  router.get("/api/employee/metadata", authenticateToken, async (req, res) => {
    const metadata = {
      cargo: await JobPosition.findAll(),
      nacionalidad: await Nationality.findAll(),
      departamento: await Department.findAll(),
      profesion: await Profession.findAll(),
      tipoPersonal: await StaffType.findAll(),
      nivelAcademico: await AcademicLevel.findAll(),
      tipoSangre: await BloodType.findAll(),
      tipoVivienda: await TypeHousing.findAll(),
      condicionVivienda: await CondHousing.findAll(),
    };

    res.json(metadata);
  });

  router.get("/api/user/metadata", authenticateToken, async (req, res) => {
    const metadata = {
      employees: await Employee.findAll({ attributes: ["id", "nombre"] }),
      roles: await Role.findAll({ attributes: ["id", "nombre"] }),
      permissions: await Permission.findAll({ attributes: ["id", "nombre"] }),
    };

    res.json(metadata);
  });

  return router;
};

export default MetadataApi;
