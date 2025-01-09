import { BloodType } from "../models/BloodType.js";

const data = [
  {
    id: 1,
    tipo: "O+",
  },
  {
    id: 2,
    tipo: "O-",
  },
  {
    id: 3,
    tipo: "B+",
  },
  {
    id: 4,
    tipo: "B-",
  },
  {
    id: 5,
    tipo: "A+",
  },
  {
    id: 6,
    tipo: "A-",
  },
  {
    id: 7,
    tipo: "AB+",
  },
  {
    id: 8,
    tipo: "AB-",
  },
];

export default async function buildBloodType() {
  if ((await BloodType.count()) != data.length) {
    data.forEach(
      async (bloodtype) =>
        await BloodType.findOrCreate({ where: bloodtype })
    );
  }
}
