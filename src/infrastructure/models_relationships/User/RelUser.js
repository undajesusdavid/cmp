const RelUser = (db) => {
  // Asociaciones de User y Roles (Muchos a Muchos):
  if (db.usuarios && db.roles) {
    db.usuarios.belongsToMany(db.roles, {
      through: "usuarios_roles", // Usa el modelo de la tabla pivote, por ejemplo: db.UsuariosRoles
      foreignKey: "user_id",
      otherKey: "role_id",
      as: "roles",
    });

    db.roles.belongsToMany(db.usuarios, {
      through: "usuarios_roles",
      foreignKey: "role_id",
      otherKey: "user_id",
      as: "usuarios",
    });
  } else {
    console.warn(
      "Advertencia: Los modelos 'usuarios' o 'roles' no se encontraron para definir la asociación User-Role."
    );
  }

  // Asociaciones de User y Permission (Muchos a Muchos):
  if (db.usuarios && db.permisos) {
    db.usuarios.belongsToMany(db.permisos, {
      through: "usuarios_permisos", // Usa el modelo de la tabla pivote, por ejemplo: db.UsuariosPermisos
      foreignKey: "user_id",
      otherKey: "permission_id",
      as: "permisos",
    });

    db.permisos.belongsToMany(db.usuarios, {
      through: "usuarios_permisos",
      foreignKey: "permission_id",
      otherKey: "user_id",
      as: "usuarios",
    });
  } else {
    console.warn(
      "Advertencia: Los modelos 'usuarios' o 'permisos' no se encontraron para definir la asociación User-Permission."
    );
  }
};

export default RelUser;
