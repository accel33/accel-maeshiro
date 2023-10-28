import { NextFunction, Request, Response } from 'express';

const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const fsPromesas = require('fs').promises;
const path = require('path');

export const logEvents = async (mensaje: string, nombreDeArchivo: string) => {
  const fecha = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;

  // Dentro del mensaje vamos a poner: Fecha, ID, Mensaje
  const logMessage = `${fecha}\t${uuid()}\t${mensaje}\n`;

  // Rutas
  const logFolder = path.join(__dirname, '..', 'logs');
  const logFile = path.join(logFolder, nombreDeArchivo);

  try {
    if (!fs.existsSync(logFolder)) {
      // Creamos folder
      await fsPromesas.mkdir(logFolder);
    } // Si no existe la ruta, creamos el archivo
    await fsPromesas.appendFile(logFile, logMessage);
  } catch (err) {
    console.log(err);
  }
};

//TODO buscar solo loguear solicitudes especificas, buscar minimizar la cantidad de logs en el futuro
export const logger = (req: Request, res: Response, next: NextFunction) => {
  const mensaje = `${req.method}\t${req.url}\t${req.headers.origin}`;

  logEvents(mensaje, 'reqLog.log');
  next();
};
