import { Nationality } from "../models/Nationality.js";

const data = [
  {
    id: 1,
    nombre: "Venezolana",
  },
  {
    id: 2,
    nombre: "Colombiana",
  },
  {
    id: 3,
    nombre: "Peruana",
  },
  {
    id: 4,
    nombre: "Cubana",
  },
  {
    id: 5,
    nombre: "USA",
  },
];

export default async function buildNationality() {
  if ((await Nationality.count()) != data.length) {
    data.forEach(
      async (nacionalidad) =>
        await Nationality.findOrCreate({ where: nacionalidad })
    );
  }
}
