import express from 'express';
const router = express.Router();
import { login, refresher, logout } from '../controllers/authController';
import { loginLimitador } from '../middleware/loginLimitador';

router.route('/').post(loginLimitador, login);

router.route('/refresh').get(refresher);

router.route('/logout').post(logout);

export default router;
