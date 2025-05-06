import { Router } from 'express';
import * as quoteController from '../controllers/quoteController';
import { validateQuoteRequest } from '../validation/quoteRequestValidation';

const router = Router();

router.post('/quote', validateQuoteRequest, quoteController.getQuote);

export default router;