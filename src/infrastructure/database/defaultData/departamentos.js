const data = [
  {
    id: 1,
    nombre: "DIR. ASUNTOS JURIDICOS",
    nomenclatura: "DSJ"
  },
  {
    id: 2,
    nombre: "DIR. AUDITORIA INTERNA",
    nomenclatura: "DAI"
  },
  {
    id: 3,
    nombre: "DIR. ADMINISTRACION Y FINANZAS",
    nomenclatura: "DAF"
  },
  {
    id: 4,
    nombre: "DIR. ATENCION AL CIUDADANO",
    nomenclatura: "DAC"
  },
  {
    id: 5,
    nombre: "DIR. POTESTAD INVESTIGATIVA",
    nomenclatura: "DPI"
  },
  {
    id: 6,
    nombre: "DIR. DETERMINACIÓN DE RESPONSABILIDADES",
    nomenclatura: "DDR"
  },
  {
    id: 7,
    nombre: "DIR. PLANIFICACIÓN, SECRETARÍA Y ARCHIVO",
    nomenclatura: "DPSA"
  },
  {
    id: 8,
    nombre: "DIR. CONTROL POSTERIOR",
    nomenclatura: "DCP"
  },
];

const handleCreate = async (db) => {
  if ((await db.departamentos.count()) === 0) {
    await db.departamentos.bulkCreate(data);
  }
};

export default handleCreate;
