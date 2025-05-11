import { Router } from 'express';
import * as tokenController from '../controllers/tokenController';
import * as quoteController from '../controllers/quoteController';
import { validateQuoteRequest } from '../validation/quoteRequestValidation';

const router = Router();

router.post('/quote', validateQuoteRequest, quoteController.getQuote);
router.get('/tokens', tokenController.getTokens);

export default router;