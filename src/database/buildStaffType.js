import { StaffType } from "../models/StaffType.js";

const data = [
  {
    id: 1,
    nombre: "Maxima autoridad",
  },
  {
    id: 2,
    nombre: "Directivo",
  },
  {
    id: 3,
    nombre: "Jefatura",
  },
  {
    id: 4,
    nombre: "Administrativo",
  },
  {
    id: 5,
    nombre: "Auditor",
  },
  {
    id: 6,
    nombre: "Promotor(a)",
  },
  {
    id: 7,
    nombre: "Chofer",
  },
  {
    id: 8,
    nombre: "Mensajero",
  },
  {
    id: 9,
    nombre: "Aseador(a)",
  },
  {
    id: 10,
    nombre: "Seguridad",
  },
  {
    id: 11,
    nombre: "Jubilado",
  },
  {
    id: 12,
    nombre: "Archivista",
  },
  {
    id: 13,
    nombre: "Planificador(a)",
  },
];

export default async function buildStaffType() {
  if ((await StaffType.count()) != data.length) {
    data.forEach(
      async (tipo_personal) =>
        await StaffType.findOrCreate({ where: tipo_personal })
    );
  }
}
