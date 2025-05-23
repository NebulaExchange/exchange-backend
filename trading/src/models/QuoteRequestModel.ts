export interface QuoteRequestModel {
  amountFrom: string;
  accountFrom: string;
  tokenFrom: string;
  chainFrom?: string;
  accountTo?: string;
  tokenTo: string;
  chainTo?: string;
}
