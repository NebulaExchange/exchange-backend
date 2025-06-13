import { BuyTokenDestination, OrderBookApi, OrderQuoteSideKindBuy, OrderQuoteSideKindSell, PriceQuality, SellTokenSource, SigningScheme, SupportedChainId,CowError } from '@cowprotocol/cow-sdk'
import { QuoteRequestModel } from '../models/QuoteRequestModel'
import { QuoteResponseModel } from '../models/QuoteResponseModel'
import { TokenModel } from '../models/TokenModel';
import CowswapTokens from '../data/cowswapTokens';
import { CowswapOrder } from '../models/OrderRequestModel'
import { OrderResponseModel } from '../models/OrderResponseModel'
import { auditService } from '../services/auditService';

export const ETH_FLOW_QUOTE_PARAMS = {
  signingScheme: SigningScheme.EIP1271,
  onchainOrder: true,
  verificationGasLimit: 0,
} as const;

class CowswapService {
  async GetQuote(
    request: QuoteRequestModel
  ): Promise<QuoteResponseModel | null> {
    try {
      const orderBookApi = new OrderBookApi({
        chainId: this.mapChainKeyToId(request.chainFrom),
      });

      const quote = await orderBookApi.getQuote(
        request.kind === "EXACT_INPUT"
          ? {
              sellToken: this.isNative(request.tokenFrom)
                ? this.getWrappedNativeToken(
                    this.mapChainKeyToId(request.chainFrom)
                  )
                : request.tokenFrom,
              buyToken: this.isNative(request.tokenTo)
                ? this.getWrappedNativeToken(
                    this.mapChainKeyToId(request.chainFrom)
                  )
                : request.tokenTo,
              from: request.accountFrom,
              receiver: request.accountTo ?? request.accountFrom,
              sellAmountBeforeFee: request.amount,
              kind: OrderQuoteSideKindSell.SELL,
              validFor: request.ttl,
              appData: request.appData,
              priceQuality: PriceQuality.VERIFIED,
              buyTokenBalance: BuyTokenDestination.ERC20,
              sellTokenBalance: SellTokenSource.ERC20,
              onchainOrder: false,
              signingScheme: request.isSmartContractWallet
                ? SigningScheme.PRESIGN
                : SigningScheme.EIP712,
              ...(request.isNative === true ? ETH_FLOW_QUOTE_PARAMS : {}),
            }
          : {
              sellToken: this.isNative(request.tokenFrom)
                ? this.getWrappedNativeToken(
                    this.mapChainKeyToId(request.chainFrom)
                  )
                : request.tokenFrom,
              buyToken: this.isNative(request.tokenTo)
                ? this.getWrappedNativeToken(
                    this.mapChainKeyToId(request.chainFrom)
                  )
                : request.tokenTo,
              from: request.accountFrom,
              receiver: request.accountTo ?? request.accountFrom,
              buyAmountAfterFee: request.amount,
              kind: OrderQuoteSideKindBuy.BUY,
              validFor: request.ttl,
              appData: request.appData,
              priceQuality: PriceQuality.VERIFIED,
              buyTokenBalance: BuyTokenDestination.ERC20,
              sellTokenBalance: SellTokenSource.ERC20,
              onchainOrder: false,
              signingScheme: request.isSmartContractWallet
                ? SigningScheme.PRESIGN
                : SigningScheme.EIP712,
              ...(request.isNative === true ? ETH_FLOW_QUOTE_PARAMS : {}),
            }
      );

      const sellAmountBeforeFee = BigInt(quote.quote.sellAmount);
      const sellAmountAfterFee = BigInt(quote.quote.sellAmount) + BigInt(quote.quote.feeAmount);
      const buyAmountBeforeFee = BigInt(quote.quote.buyAmount);
      const buyAmountAfterFee = (buyAmountBeforeFee * sellAmountAfterFee) / sellAmountBeforeFee;

      const response: QuoteResponseModel = {
        originalQuote: quote,
        amountTo: buyAmountAfterFee.toString(),
        quoteSource: "COWSWAP",
      };

      await auditService.LogQuote(request.requestId!, response);
      return response;
    } catch (error: any) {
      const errorMessage = error?.body?.errorType ?? error?.message ?? String(error);
      await auditService.LogQuoteFailure(request.requestId!, "COWSWAP", errorMessage);
      return null;
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

  isNative(token: string): boolean {
    return token.toLowerCase() === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
  }

  getWrappedNativeToken(chain: number): string {
    switch (chain) {
      case SupportedChainId.MAINNET:
        return "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2".toLowerCase();
      case SupportedChainId.GNOSIS_CHAIN:
        return "0x6a023ccd1ff6f2045c3309768ead9e68f978f6e1".toLowerCase();
      case SupportedChainId.BASE:
        return "0x4200000000000000000000000000000000000006".toLowerCase();
      case SupportedChainId.ARBITRUM_ONE:
        return "0x82af49447d8a07e3bd95bd0d56f35241523fbab1".toLowerCase();
      default:
        return "";
    }
  }

  mapChainIdToKey(chain: number): string {
    switch (chain) {
      case SupportedChainId.MAINNET:
        return "eth";
      case SupportedChainId.GNOSIS_CHAIN:
        return "gnosis";
      case SupportedChainId.BASE:
        return "base";
      case SupportedChainId.ARBITRUM_ONE:
        return "arb";
      default:
        return "";
    }
  }

  mapChainKeyToId(chain: string): number {
    switch (chain) {
      case "eth":
        return SupportedChainId.MAINNET;
      case "gnosis":
        return SupportedChainId.GNOSIS_CHAIN;
      case "base":
        return SupportedChainId.BASE;
      case "arb":
        return SupportedChainId.ARBITRUM_ONE;
      default:
        return 0;
    }
  }

  async CreateOrder(request: CowswapOrder): Promise<OrderResponseModel | null> {
    try {
      const orderBookApi = new OrderBookApi({
        chainId: SupportedChainId.MAINNET,
      });

      const orderId = await orderBookApi.sendOrder(request);
      return {
        orderType: "cowswap",
        orderId,
      };
    } catch (error) {
      console.error("Error creating order:", error);
      return null;
    }
  }
}

// Export a singleton instance
export const cowswapService = new CowswapService();

// Export the class for testing or custom instantiation
export default CowswapService;
