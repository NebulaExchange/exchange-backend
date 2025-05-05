import { Router } from 'express';
import * as quoteController from '../controllers/quoteController';

const router = Router();

//router.post('/quote', quoteController.createExample);
router.get('/example', quoteController.getExample);

export default router;