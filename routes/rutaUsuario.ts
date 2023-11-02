import express from 'express';
const router = express.Router();
import {
  actualizarUsuario,
  borrarUsuario,
  crearUsuario,
  obtenerTodosLosUsuarios,
  obtenerUsuario,
} from '../controllers/controladorUsuario';
import { verificarJWT } from '../middleware/verificarJWT';

// router.use(verificarJWT);

router.route('/').get(obtenerTodosLosUsuarios).post(crearUsuario);
router
  .route('/:id')
  .get(obtenerUsuario)
  .patch(actualizarUsuario)
  .delete(borrarUsuario);

export default router;
