import express from 'express';
const router = express.Router();
import {
  actualizarUsuario,
  borrarUsuario,
  crearUsuario,
  obtenerTodosLosUsuarios,
} from '../controllers/usuarioController';

router
  .route('/')
  .get(obtenerTodosLosUsuarios)
  .post(crearUsuario)
  .patch(actualizarUsuario)
  .delete(borrarUsuario);

export default router;
