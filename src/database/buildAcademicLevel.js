import { AcademicLevel } from "../models/AcademicLevel.js";

const data = [
  {
    id: 1,
    nivel: "Bachiller",
  },
  {
    id: 2,
    nivel: "Universitario",
  },
  {
    id: 3,
    nivel: "TSU",
  },
  {
    id: 4,
    nivel: "Ingenieria",
  },
  {
    id: 5,
    nivel: "Licenciatura",
  },
  {
    id: 6,
    nivel: "Maestria",
  },
  {
    id: 7,
    nivel: "Doctorado",
  },
];

export default async function buildAcademicLevel() {
  if ((await AcademicLevel.count()) != data.length) {
    data.forEach(
      async (academicLevel) =>
        await AcademicLevel.findOrCreate({ where: academicLevel })
    );
  }
}
