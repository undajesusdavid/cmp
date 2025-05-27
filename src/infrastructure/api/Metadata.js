import { Router } from "express";

//Employee
import { Department } from "../models/metadata/Department.js";
import { JobPosition } from "../models/metadata/JobPosition.js";
import { Nationality } from "../models/metadata/Nationality.js";
import { Profession } from "../models/metadata/Profession.js";
import { StaffType } from "../models/metadata/StaffType.js";
import { AcademicLevel } from "../models/metadata/AcademicLevel.js";
import { BloodType } from "../models/metadata/BloodType.js";
import TypeHousing from "../models/metadata/TypeHousing.js";
import CondHousing from "../models/metadata/CondHousing.js";

import authenticateToken from "../middleware/auth.js";
import { json } from "sequelize";

const MetadataApi = Router();

MetadataApi.get(
  "/api/employee/metadata",
  authenticateToken,
  async (req, res) => {
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
  }
);


export default MetadataApi;
