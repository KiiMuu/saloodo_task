import { Router } from 'express';
import { getLoginPage } from '../controllers/auth.js';
const router = Router();

router.get('/login', getLoginPage);

export default router;
