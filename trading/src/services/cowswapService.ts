
import { OrderBookApi, OrderQuoteSideKindSell, SupportedChainId } from '@cowprotocol/cow-sdk'
import { QuoteRequestModel } from '../models/QuoteRequestModel'
import { QuoteResponseModel } from '../models/QuoteResponseModel'

class CowswapService {
  async GetQuote(request: QuoteRequestModel): Promise<QuoteResponseModel> {
    try {
      const orderBookApi = new OrderBookApi({
        chainId: SupportedChainId.MAINNET,
      });

      const quoteRequest = {
        sellToken: request.tokenFrom,
        buyToken: request.tokenTo,
        from: request.account,
        receiver: request.account,
        sellAmountBeforeFee: request.amountFrom,
        kind: OrderQuoteSideKindSell.SELL,
      };
      
      const { quote } = await orderBookApi.getQuote(quoteRequest);
      return {
        originalQuote: quote,
        amountTo: quote.buyAmount,
      };
    } catch (error) {
      throw new Error('Failed to fetch orders from CoW Protocol API');
    }
  }
}

// Export a singleton instance
export const cowswapService = new CowswapService();

// Export the class for testing or custom instantiation
export default CowswapService;
