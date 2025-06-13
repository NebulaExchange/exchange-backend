export interface QuoteRequestModel {
  amount: string;
  accountFrom: string;
  tokenFrom: string;
  chainFrom: string;
  accountTo?: string;
  tokenTo: string;
  chainTo: string;
  slippage: number; //used in NEAR Intents
  kind: QuoteKind;
  ttl: number;
  appData?: string;
  isSmartContractWallet?: boolean; //backwards compatibility with sky.money
  isNative?: boolean; //backwards compatibility with sky.money
  requestId?: string; //optional, useful for tracking and auditing
}

export type QuoteKind = "EXACT_INPUT" | "EXACT_OUTPUT";