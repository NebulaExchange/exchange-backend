import { OrderBookApi, OrderQuoteSideKindSell, SupportedChainId } from '@cowprotocol/cow-sdk'
import { QuoteRequestModel } from '../models/QuoteRequestModel'
import { QuoteResponseModel } from '../models/QuoteResponseModel'
import { TokenModel } from '../models/TokenModel';
import CowswapTokens from '../data/cowswapTokens';

class CowswapService {
  async GetQuote(
    request: QuoteRequestModel
  ): Promise<QuoteResponseModel | null> {
    try {
      const orderBookApi = new OrderBookApi({
        chainId: SupportedChainId.MAINNET,
      });

      const { quote } = await orderBookApi.getQuote({
        sellToken: request.tokenFrom,
        buyToken: request.tokenTo,
        from: request.accountFrom,
        receiver: request.accountTo ?? request.accountFrom,
        sellAmountBeforeFee: request.amountFrom,
        kind: OrderQuoteSideKindSell.SELL,
        
      });
      return {
        originalQuote: quote,
        amountTo: quote.buyAmount,
      };
    } catch (error) {
      return null;
      //throw new Error('Failed to fetch orders from CoW Protocol API');
    }
  }

  GetTokens(): TokenModel[] {
    try {
      var tokens = CowswapTokens.map((t) => {
        return {
          address: t.address,
          chain: this.mapChainIdToKey(t.chainId),
          decimals: t.decimals,
          name: t.name,
          symbol: t.symbol,
          logoURI: t.logoURI,
        };
      });

      return tokens;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  mapChainIdToKey(chain: number): string {
    switch (chain) {
      case 1:
        return "eth";
      case 100:
        return "gnosis";
      case 8453:
        return "base";
      case 42161:
        return "arb";
      default:
        return "";
    }
  }

  mapChainKeyToId(chain: string): number {
    switch (chain) {
      case "eth":
        return 1;
      case "gnosis":
        return 100;
      case "base":
        return 8453;
      case "arb":
        return 42161;
      default:
        return 0;
    }
  }
}

// Export a singleton instance
export const cowswapService = new CowswapService();

// Export the class for testing or custom instantiation
export default CowswapService;
