import { Router } from 'express';
import {
	getAllParcels,
	getSingleParcel,
	editParcel,
} from '../controllers/biker.js';
import { isAuth } from '../middlewares/isAuth.js';
const router = Router();

router.get('/todo', isAuth, getAllParcels);
router.get('/todo/:id', isAuth, getSingleParcel);
router.post('/todo/:id/edit', isAuth, editParcel);

export default router;
