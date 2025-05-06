import { Response } from 'express';
import { QuoteRequest } from '../models/QuoteRequestModel';
import { cowswapService } from '../services/cowswapService';
import { nearintentService } from '../services/nearIntentService';

// POST /api/quote
export const getQuote = async (req: QuoteRequest, res: Response):  Promise<void> => 
{
  if (!req.data) {
    res.status(500);
    return;
  }

  const cowQuote = await cowswapService.GetQuote(req.data);
  const nearQuote = await nearintentService.GetQuote(req.data);
  res.status(200).json({
    success: true,
    message: "OK",
    data: {
      cowswapQuote: cowQuote,
      nearIntentQuote: nearQuote,
    },
  });
};