import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

export default function authenticateToken(req: Request, res: Response, next: NextFunction) {

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Obtener el token después de 'Bearer'
  const jwt_secret = process.env.JWT_SECRET;

  if (token == null) {
    return res
      .status(401)
      .json({ message: "No se proporcionó token de autenticación." });
  }

  if (!jwt_secret) {
    return res
      .status(401)
      .json({ message: "El JWT_SECRET no esta definido en las variables de entorno." });
  }


  jwt.verify(token, jwt_secret, (err, payload) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido o expirado." });
    }

    if (payload && typeof payload !== "string") {
      req.user = payload.user;
    }

    next();
  });
}


