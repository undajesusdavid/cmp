const data = [
  {
    id: 1,
    nombre: "add_employee",
    descripcion: "Permiso para registrar empleados",
  },
  {
    id: 2,
    nombre: "edit_employee",
    descripcion: "Permiso para editar empleados",
  },
  {
    id: 3,
    nombre: "delete_employee",
    descripcion: "Permiso para eliminar empleados",
  },
  {
    id: 4,
    nombre: "view_details_employee",
    descripcion: "Permiso para ver los detalles del empleados",
  },
];

const handleCreate = async (db) => {
  if ((await db.permisos.count()) === 0) {
    await db.permisos.bulkCreate(data);
  }
};

export default handleCreate;
