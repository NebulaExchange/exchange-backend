import { Router } from 'express';
import * as tokenController from '../controllers/tokenController';
import * as quoteController from '../controllers/quoteController';
import * as orderController from '../controllers/orderController';
import { validateQuoteRequest } from '../validation/quoteRequestValidation';
import { validateOrderRequest } from '../validation/orderRequestValidation';

const router = Router();

router.post('/quote', validateQuoteRequest, quoteController.getQuote);
router.get('/tokens', tokenController.getTokens);
router.post('/order', validateOrderRequest, orderController.createOrder);

export default router;