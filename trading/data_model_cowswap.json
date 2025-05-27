
type QuoteRequest = {
      sellToken: Address;
      buyToken: Address;
      sellAmountBeforeFee: number
	  buyAmountBeforeFee: number
	}

type QuoteResponse =
	{
    id: string;
    sellToken: Address;
    buyToken: Address;
    sellAmount: number;
    buyAmount: number;
    validTo: number;
    feeAmount: number;
	
	}

type OrderRequest = {
  id: string;
    sellToken: Address;
    buyToken: Address;
    sellAmount: number;
    buyAmount: number;
    validTo: number;
    feeAmount: number;
    signature: string;
    slippage: number;
    quoteId?: string;
    expiration: string;
}
