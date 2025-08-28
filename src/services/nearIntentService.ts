import { OneClickService, QuoteRequest } from '@defuse-protocol/one-click-sdk-typescript';
import { QuoteRequestModel } from '../models/QuoteRequestModel'
import { QuoteResponseModel } from '../models/QuoteResponseModel'
import { TokenModel } from '../models/TokenModel';
import NearIntentTokens from '../data/nearIntentTokens';
import { NearIntentsOrder } from '../models/OrderRequestModel';
import { OrderResponseModel } from '../models/OrderResponseModel';
import { auditService } from '../services/auditService';
import { SwapStatusModel } from '../models/SwapStatusModel';

class NearIntentService {
  async GetQuote(
    request: QuoteRequestModel
  ): Promise<QuoteResponseModel | null> {
    try {
      const originAsset = this.MapToNearAsset(
        request.chainFrom ?? "eth",
        request.tokenFrom
      );

      const destinationAsset = this.MapToNearAsset(
        request.chainTo ?? "eth",
        request.tokenTo
      );

      if (!originAsset || !destinationAsset) return null;

      const quoteRequest: QuoteRequest = {
        dry: false,
        deadline: new Date(Date.now() + request.ttl * 1000).toISOString(),
        swapType:
          request.kind === "EXACT_INPUT"
            ? QuoteRequest.swapType.EXACT_INPUT
            : QuoteRequest.swapType.EXACT_OUTPUT,
        slippageTolerance: request.slippage * 100,
        originAsset: originAsset,
        depositType: request.depositNative === false ? QuoteRequest.depositType.INTENTS : QuoteRequest.depositType.ORIGIN_CHAIN,
        destinationAsset: destinationAsset,
        amount: request.amount,
        refundTo: request.accountFrom,
        refundType: request.depositNative === false ? QuoteRequest.refundType.INTENTS : QuoteRequest.refundType.ORIGIN_CHAIN,
        recipient: request.accountTo ?? request.accountFrom,
        recipientType: request.recipientNative === false ? QuoteRequest.recipientType.INTENTS : QuoteRequest.recipientType.DESTINATION_CHAIN,
        appFees:
          !!process.env.NEAR_INTENT_FEE_ADDRESS &&
          !!process.env.NEAR_INTENT_FEE_BIPS
            ? [
                {
                  fee: Number(process.env.NEAR_INTENT_FEE_BIPS),
                  recipient: process.env.NEAR_INTENT_FEE_ADDRESS,
                },
              ]
            : undefined,
      };

      // Get quote
      const quote = await OneClickService.getQuote(quoteRequest);
      quote.quoteRequest.originAsset = this.MapFromNearAsset({
        assetId: quote.quoteRequest.originAsset,
        blockchain: request.chainFrom,
      });
      quote.quoteRequest.destinationAsset = this.MapFromNearAsset({
        assetId: quote.quoteRequest.destinationAsset,
        blockchain: request.chainTo,
      });

      const response: QuoteResponseModel = {
        originalQuote: quote,
        amountTo: quote.quote.amountOut,
        quoteSource: "NEARINTENTS",
      };

      await auditService.LogQuote(request.requestId!, response);
      return response;
    } catch (error: any) {
      const errorMessage = error?.message ?? String(error);
      await auditService.LogQuoteFailure(
        request.requestId!,
        "NEARINTENTS",
        errorMessage
      );
      return null;
    }
  }

  async CreateOrder(
    request: NearIntentsOrder
  ): Promise<OrderResponseModel | null> {
    try {
      await OneClickService.submitDepositTx(request);
      return {
        orderType: "nearIntent",
        // although there is txHash, near intents api use depositAddress to check order status
        orderId: request.depositAddress,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  GetTokens(): TokenModel[] {
    try {
      var tokens = NearIntentTokens.map((t) => {
        return {
          address: this.MapFromNearAsset(t),
          chain: t.blockchain,
          decimals: t.decimals,
          name: t.symbol,
          symbol: t.symbol,
          logoURI: null,
        };
      });

      return tokens;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async GetStatus(id: string): Promise<SwapStatusModel | undefined> {
    try {
      const status = await OneClickService.getExecutionStatus(id);
      if (!status) return undefined;

      return {
        status: status.status,
        processorHashes: status.swapDetails?.intentHashes,
        sourceChainHashes: status.swapDetails?.originChainTxHashes?.map(
          (tx) => tx.hash
        ),
        sourceChainTxUrls: status.swapDetails?.originChainTxHashes?.map(
          (tx) => tx.explorerUrl
        ),
        targetChainHashes: status.swapDetails?.destinationChainTxHashes?.map(
          (tx) => tx.hash
        ),
        targetChainTxUrls: status.swapDetails?.destinationChainTxHashes?.map(
          (tx) => tx.explorerUrl
        ),
      };
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  MapToNearAsset(blockchain: string, contractAddress: string): string {
    const mappedToken =
      tokenMap[blockchain]?.[contractAddress.toLowerCase()] || null;
    if (mappedToken) return mappedToken;

    var nep141Chain = blockchain === "near" ? "" : blockchain + "-";
    return `nep141:${nep141Chain}${contractAddress.toLowerCase()}.omft.near`.toLowerCase();
  }

  MapFromNearAsset(t: { assetId: string; blockchain: string }): string {
    const mappedToken = tokenMapInverse[t.blockchain]?.[t.assetId] || null;
    if (mappedToken) return mappedToken;

    switch (t.blockchain) {
      case "near": {
        const regex = /^nep141:([\.\-0-9a-zA-Z]+)$/;
        const match = t.assetId.match(regex);
        if (match) {
          return match[1];
        }

        throw new Error("Invalid NEAR asset ID format");
      }
      default: {
        const regex = /^nep141:(\w+)-((0x)?[0-9a-fA-F]+)\.omft\.near$/;
        const match = t.assetId.match(regex);

        if (match) {
          return match[2];
        }

        throw new Error("Invalid NEAR asset ID format");
      }
    }
  }
}

const tokenMap: { [key: string]: { [key: string]: string } } = {
  eth: { "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee": "nep141:eth.omft.near" },
  bsc: { "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee": "nep141:bsc.omft.near" },
  sol: { "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee": "nep141:sol.omft.near" },
  zec: { "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee": "nep141:zec.omft.near" },
  arb: { "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee": "nep141:arb.omft.near" },
  base: { "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee": "nep141:base.omft.near" },
  btc: { "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee": "nep141:btc.omft.near" },
  gnosis: {
    "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee": "nep141:gnosis.omft.near",
  },
  doge: {
    "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee": "nep141:doge.omft.near",
  },
  xrp: { "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee": "nep141:xrp.omft.near" },
  bera: {
    "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee": "nep141:bera.omft.near",
  },
  pol: { "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee": "nep141:pol.omft.near" },
  tron: {
    "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee": "nep141:tron.omft.near",
  },
};

const tokenMapInverse: { [key: string]: { [key: string]: string } } = {
  "eth": { "nep141:eth.omft.near": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" },
  "bsc": { "nep141:bsc.omft.near": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" },
  "sol": { "nep141:sol.omft.near": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" },
  "zec": { "nep141:zec.omft.near": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" },
  "arb": { "nep141:arb.omft.near": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" },
  "base": { "nep141:base.omft.near": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" },
  "btc": { "nep141:btc.omft.near": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" },
  "gnosis": { "nep141:gnosis.omft.near": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" },
  "doge": { "nep141:doge.omft.near": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" },
  "xrp": { "nep141:xrp.omft.near": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" },
  "bera": { "nep141:bera.omft.near": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" },
  "pol": { "nep141:pol.omft.near": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" },
  "tron": { "nep141:tron.omft.near": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" },
};

// Export a singleton instance
export const nearintentService = new NearIntentService();

// Export the class for testing or custom instantiation
export default NearIntentService;