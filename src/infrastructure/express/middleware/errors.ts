import type { Request, Response, NextFunction } from "express";

type Error = {
  status: number,
  message: string
}

const MiddlewareErrors = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // Configuración de la respuesta por defecto
  const statusCode = err.status || 500;
  const message = err.message || "Error interno del servidor";


  res.status(statusCode).json({
    status: statusCode,
    message: message,
  });
};

export default MiddlewareErrors;
