import express from 'express';
const router = express.Router();
import {
  actualizarPedido,
  borrarPedido,
  crearPedido,
  obtenerTodosLosPedidos,
  obtenerPedido,
} from '../controllers/pedidoController';

router.route('/').get(obtenerTodosLosPedidos).post(crearPedido);
router
  .route('/:id')
  .get(obtenerPedido)
  .patch(actualizarPedido)
  .delete(borrarPedido);

export default router;
