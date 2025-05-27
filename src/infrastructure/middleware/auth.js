// middleware/auth.js
import jwt from "jsonwebtoken";

function authenticateToken(req, res, next) {
  // Obtener el token del encabezado de la solicitud
  // El formato esperado es: Authorization: Bearer <token>
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Obtener el token después de 'Bearer'

  console.log(token);

  if (token == null) {
    return res
      .status(401)
      .json({ message: "No se proporcionó token de autenticación." });
  }

  // Verificar el token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // El token es inválido o ha expirado
      return res.status(403).json({ message: "Token inválido o expirado." });
    }
    // Si el token es válido, adjuntar la información del usuario al objeto de la solicitud
    // para que las rutas posteriores puedan acceder a ella.
    req.user = user.user; // Ten en cuenta que el payload tiene una propiedad 'user'
    next(); // Pasar al siguiente middleware o a la función de controlador de ruta
  });
}

export default authenticateToken;
