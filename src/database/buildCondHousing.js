import { CondHousing } from "../models/CondHousing.js";

const data = [
  {
    id: 1,
    condicion: "Propia",
  },
  {
    id: 2,
    condicion: "De un familiar",
  },
  {
    id: 3,
    condicion: "Alquilada",
  },
];

export default async function buildCondHousing() {
  if ((await CondHousing.count()) != data.length) {
    data.forEach(
      async (condhousing) =>
        await CondHousing.findOrCreate({ where: condhousing })
    );
  }
}
