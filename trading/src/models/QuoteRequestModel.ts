import { Request, Response } from 'express';
export interface QuoteRequestModel {
  amountFrom: string;
  accountFrom: string;
  tokenFrom: string;
  chainFrom: string | undefined;
  accountTo: string | undefined;
  tokenTo: string;
  chainTo: string | undefined;
}

export interface QuoteRequest extends Request {
  data?: QuoteRequestModel;
}