import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

const { registrarEventos } = require('./logger');

export const manejadorDeErrores: ErrorRequestHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { method, url, headers } = req;
  const { name, message } = error;
  const mensaje = `${name}\t${message}\t${method}\t${url}\t${headers.origin}`;

  registrarEventos(mensaje, 'errorRegistro.log');
  console.log(error.stack);

  const status = res.statusCode ? res.statusCode : 500;
  res.status(status);
  res.json({ message: error.message });
  next();
};
