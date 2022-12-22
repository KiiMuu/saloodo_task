import { Router } from 'express';
import { getSenderParcels } from '../controllers/sender.js';
const router = Router();

router.get('/parcels', getSenderParcels);

export default router;
