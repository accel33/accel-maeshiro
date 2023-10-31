import express from 'express';
const router = express.Router();
import {
  actualizarProducto,
  borrarProducto,
  crearProducto,
  obtenerTodosLosProductos,
  obtenerProducto,
} from '../controllers/productoController';
import { verificarJWT } from '../middleware/verificarJWT';

// router.use(verificarJWT);

router.route('/').get(obtenerTodosLosProductos).post(crearProducto);
router
  .route('/:id')
  .get(obtenerProducto)
  .patch(actualizarProducto)
  .delete(borrarProducto);

export default router;
