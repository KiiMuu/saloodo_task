import { Router } from 'express';
import {
	getSenderParcels,
	getCreateParcelPage,
	createNewParcel,
} from '../controllers/sender.js';
import { isAuth } from '../middlewares/isAuth.js';
const router = Router();

router.get('/dashboard', isAuth, getSenderParcels);
router.get('/create-parcel', isAuth, getCreateParcelPage);
router.post('/create-parcel', isAuth, createNewParcel);

export default router;
