import { Router } from 'express';
import { getHomepage } from '../controllers/index.js';
const router = Router();

router.get('/', getHomepage);

export default router;
