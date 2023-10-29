import express from 'express';
const router = express.Router();
import {
  actualizarProducto,
  borrarProducto,
  crearProducto,
  obtenerTodosLosProductos,
  obtenerProducto,
} from '../controllers/productoController';

router.route('/').get(obtenerTodosLosProductos).post(crearProducto);
router
  .route('/:id')
  .get(obtenerProducto)
  .patch(actualizarProducto)
  .delete(borrarProducto);

export default router;
