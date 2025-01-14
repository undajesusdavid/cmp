import Nationality from "../../models/metadata/Nationality.js";
import nacionalidad from "./nacionalidad.js";

import TypeHousing from "../../models/metadata/TypeHousing.js";
import tipo_casa from "./tipo_casa.js";

import CondHousing from "../../models/metadata/CondHousing.js";
import condicion_casa from "./condicion_casa.js";

import { BloodType } from "../../models/metadata/BloodType.js";
import tipo_sangre from "./tipo_sangre.js";

import { Profession } from "../../models/metadata/Profession.js";
import profesion from "./profesion.js";

import { StaffType } from "../../models/metadata/StaffType.js";
import tipo_personal from "./tipo_personal.js";

import { JobPosition } from "../../models/metadata/JobPosition.js";
import cargo from "./cargo.js";

import { Department } from "../../models/metadata/Department.js";
import departamento from "./departamento.js";

import { AcademicLevel } from "../../models/metadata/AcademicLevel.js";
import nivelAcademico from "./nivel_academico.js";

import FamilyRelationship from "../../models/metadata/FamilyRelationship.js";
import parentesco from "./parentesco.js";

export default [
  { table: Nationality, data: nacionalidad },
  { table: TypeHousing, data: tipo_casa },
  { table: CondHousing, data: condicion_casa },
  { table: BloodType, data: tipo_sangre },
  { table: Profession, data: profesion },
  { table: StaffType, data: tipo_personal },
  { table: JobPosition, data: cargo },
  { table: Department, data: departamento },
  { table: AcademicLevel, data: nivelAcademico },
  { table: FamilyRelationship, data: parentesco },
];
