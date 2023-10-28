import express, { Request, Response } from 'express';
const router = express.Router();
import path from 'path';

router.get('^/$|/index(.html)?', (req: Request, res: Response) => {
  const htmlRuta = path.join(__dirname, '..', 'views', 'index.html ');
  res.sendFile(htmlRuta.trim()); // Enviamos la ruta donde se encuentra el archivo html
});

export default router;
