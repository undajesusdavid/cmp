const MiddlewareErrors = (err, req, res, next) => {
  // Configuración de la respuesta por defecto
  const statusCode = err.status || 500;
  const message = err.message || "Error interno del servidor";

  // Envía la respuesta de error al cliente

  //res.status(statusCode).send(message);

  res.status(statusCode).json({
    status: statusCode,
    message: message,
  });
};

export default MiddlewareErrors;
