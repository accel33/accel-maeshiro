require('dotenv').config();

// Importaciones de Terceros
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Importaciones de Node.js
import path from 'path';

// Importaciones Locales
import { opcionesCors } from './config/opcionesCors';
import { AppDataSource } from './config/data-source';
import { logger, logEvents } from './middleware/logger';
import { manejadorDeErrores } from './middleware/manejadorDeErrores';
import { InitializedRelationError } from 'typeorm';

import rutaUsuario from './routes/rutaUsuario';
import rutaRaiz from './routes/rutaPrincipal';

AppDataSource.initialize()
  .then(async () => {
    // Config
    const app = express();
    const PORT = process.env.PORT || 8000;
    console.log(`Entorno: ${process.env.NODE_ENV}`);

    // Middlewares Config
    app.use(express.json());
    app.use(cors(opcionesCors));
    app.use(cookieParser());
    app.use(logger);

    // Rutas de la 'Interfaz de Programacion' para Aplicaciones
    app.use('/', express.static('./public'));
    app.use('/', rutaRaiz);
    app.use('/users', rutaUsuario);

    app.all('*', (req, res) => {
      res.status(404);
      if (req.accepts('html')) {
        // res.sendFile('./views/404.html') no funcionaria porque .senfFile solo recibe rutas absolutas
        res.sendFile(path.join(__dirname, 'views', '404.html'));
      } else if (req.accepts('json')) {
        res.json({ message: '404 No Encontraado' });
      } else {
        res.type('txt').send('404 No Encontrado');
      }
    });

    app.use(manejadorDeErrores);
    app.listen(PORT, () => console.log(`Escuchando en el puerto ${PORT}`));
  })
  .catch((err: InitializedRelationError) => {
    console.log(err);
    logEvents(
      `${err.message}: ${err.name}\t${err.stack}\t`,
      'postgresErrLog.log'
    );
  });
