
//COWSWAP

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


//NEAR INTENTS

type QuoteRequest = {
    swapType: (EXACT_INPUT or EXACT_OUTPUT)
    slippageTolerance: number;
    originAsset: string;
    destinationAsset: string;
    amount: string;
    deadline: string;
    quoteWaitingTimeMs?: number;
}

type QuoteResponse = {
    depositAddress?: string;
    amountIn: string;
    minAmountIn: string;
    amountOut: string;
    minAmountOut: string;
    deadline?: string;
    timeEstimate?: number;
}

// ONEINCH

type QuoteRequest = {
  src: Address;
  dst: Address;
  amount:  number;
  slippage: number;
}
type QuoteResponse = {
  src: Address;
  dst: Address;
  dstAmount:  number;
  paths: Path[];
  callData: CallData;
}
type Path = {
  name: string;
  part: number;
  from: Address;
  to: Address;
} 

// COMMON MODEL 
