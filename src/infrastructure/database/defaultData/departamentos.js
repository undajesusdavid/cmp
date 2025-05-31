const data = [
  {
    id: 1,
    nombre: "CGR",
  },
  {
    id: 2,
    nombre: "DIR. ASUNTOS JURIDICOS",
  },
  {
    id: 3,
    nombre: "DIR. AUDITORIA INTERNA",
  },
  {
    id: 4,
    nombre: "DIR. ADMINISTRACION Y RRHH",
  },
  {
    id: 5,
    nombre: "DIR. ATENCION AL CIUDADANO",
  },
  {
    id: 6,
    nombre: "DIR. POTESTAD INVESTIGATIVA",
  },
  {
    id: 7,
    nombre: "DIR. DETERMINACIÓN DE RESPONSABILIDADES",
  },
  {
    id: 8,
    nombre: "DIR. PLANIFICACIÓN, SECRETARÍA Y ARCHIVO",
  },
  {
    id: 9,
    nombre: "DIR. CONTROL POSTERIOR",
  },
];

const handleCreate = async (db) => {
  if ((await db.departamentos.count()) === 0) {
    await db.departamentos.bulkCreate(data);
  }
};

export default handleCreate;
