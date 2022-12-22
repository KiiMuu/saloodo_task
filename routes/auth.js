import { Router } from 'express';
import {
	getLoginPage,
	getRegisterPage,
	login,
	logout,
	register,
} from '../controllers/auth.js';
import { validateLogin, validateRegister } from '../validators/auth.js';
const router = Router();

router.get('/login', getLoginPage);
router.post('/login', validateLogin, login);
router.get('/register', getRegisterPage);
router.post('/register', validateRegister, register);
router.post('/logout', logout);

export default router;
