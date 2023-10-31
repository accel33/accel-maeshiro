import express from 'express';
const router = express.Router();
import {
  actualizarPedido,
  borrarPedido,
  crearPedido,
  obtenerTodosLosPedidos,
  obtenerPedido,
} from '../controllers/pedidoController';
import { verificarJWT } from '../middleware/verificarJWT';

// router.use(verificarJWT);

router.route('/').get(obtenerTodosLosPedidos).post(crearPedido);
router
  .route('/:id')
  .get(obtenerPedido)
  .patch(actualizarPedido)
  .delete(borrarPedido);

export default router;
