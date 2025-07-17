const RelPermisionRole = (db) => {
  if (db.roles && db.permisos) {
    db.roles.belongsToMany(db.permisos, {
      through: "roles_permisos", // O el nombre de tu modelo de tabla pivote si lo tienes
      foreignKey: "role_id",
      otherKey: "permission_id",
      as: "permisos",
    });

    db.permisos.belongsToMany(db.roles, {
      through: "roles_permisos",
      foreignKey: "permission_id",
      otherKey: "role_id",
      as: "roles",
    });
  } else {
    console.warn(
      "Advertencia: Los modelos 'roles' o 'permisos' no se encontraron para definir la asociación Role-Permission."
    );
  }
};

export default RelPermisionRole;
