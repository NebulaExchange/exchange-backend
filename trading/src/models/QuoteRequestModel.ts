import { Request, Response } from 'express';
export interface QuoteRequestModel{
  account:string;
  tokenFrom: string;
  tokenTo: string;
  amountFrom: string;

}

export interface QuoteRequest extends Request {
  data?: QuoteRequestModel;
}