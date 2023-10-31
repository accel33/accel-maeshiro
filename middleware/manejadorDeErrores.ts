import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

const { logEvents } = require('./logger');

export const manejadorDeErrores: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { method, url, headers } = req;
  const { name, message } = error;
  const mensaje = `${name}\t${message}\t${method}\t${url}\t${headers.origin}`;

  logEvents(mensaje, 'errorRegistro.log');
  console.log(error.stack);

  const status = res.statusCode ? res.statusCode : 500;
  res.status(status);
  if (error.message.includes('UQ_')) {
    error.message = 'Error de restriccion: Email ya existe';
  }
  if (error.message.includes('FK_')) {
    error.message =
      'Error de restriccion: No existe ese Usuario en la base de datos';
  }
  res.json({ message: error.message });
  next();
};
