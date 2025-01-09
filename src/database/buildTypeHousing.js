import { TypeHousing } from "../models/TypeHousing.js";

const data = [
  {
    id: 1,
    tipo: "Casa",
  },
  {
    id: 2,
    tipo: "Apartamento",
  }
];

export default async function buildTypeHousing() {
  if ((await TypeHousing.count()) != data.length) {
    data.forEach(
      async (tipo_vivienda) =>
        await TypeHousing.findOrCreate({ where: tipo_vivienda })
    );
  }
}
