import express from 'express';
const router = express.Router();
import {
  actualizarUsuario,
  borrarUsuario,
  crearUsuario,
  obtenerTodosLosUsuarios,
  obtenerUsuario,
} from '../controllers/usuarioController';

router.route('/').get(obtenerTodosLosUsuarios).post(crearUsuario);
router
  .route('/:id')
  .get(obtenerUsuario)
  .patch(actualizarUsuario)
  .delete(borrarUsuario);

export default router;
