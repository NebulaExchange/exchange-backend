import { OneClickService, OpenAPI, QuoteRequest } from '@defuse-protocol/one-click-sdk-typescript';

import { QuoteRequestModel } from '../models/QuoteRequestModel'
import { QuoteResponseModel } from '../models/QuoteResponseModel'

class NearIntentService {
  async GetQuote(request: QuoteRequestModel): Promise<QuoteResponseModel> {
    try {
      // Initialize the API client
      OpenAPI.BASE = "https://1click.chaindefuser.com";

      const quoteRequest: QuoteRequest = {
        dry: true,
        deadline: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        swapType: QuoteRequest.swapType.EXACT_INPUT,
        slippageTolerance: 100, // 1%
        originAsset: `nep141:eth-${request.tokenFrom}.omft.near`,
        depositType: QuoteRequest.depositType.ORIGIN_CHAIN,
        destinationAsset: `nep141:eth-${request.tokenTo}.omft.near`,
        amount: request.amountFrom,
        refundTo: request.account,
        refundType: QuoteRequest.refundType.ORIGIN_CHAIN,
        recipient: request.account,
        recipientType: QuoteRequest.recipientType.DESTINATION_CHAIN,
      };

    //   const quoteRequest: QuoteRequest = {
    //     dry: true,
    //     deadline: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    //     swapType: QuoteRequest.swapType.EXACT_INPUT,
    //     slippageTolerance: 100, // 1%
    //     originAsset: 'nep141:arb-0xaf88d065e77c8cc2239327c5edb3a432268e5831.omft.near',
    //     depositType: QuoteRequest.depositType.ORIGIN_CHAIN,
    //     destinationAsset: 'nep141:sol-5ce3bf3a31af18be40ba30f721101b4341690186.omft.near',
    //     amount: '100000000',
    //     refundTo: '0x2527D02599Ba641c19FEa793cD0F167589a0f10D',
    //     refundType: QuoteRequest.refundType.ORIGIN_CHAIN,
    //     recipient: '13QkxhNMrTPxoCkRdYdJ65tFuwXPhL5gLS2Z5Nr6gjRK',
    //     recipientType: QuoteRequest.recipientType.DESTINATION_CHAIN
    // };

      // Get quote
      const quote = await OneClickService.getQuote(quoteRequest);
      return {
        originalQuote: quote,
        amountTo: quote.quote.amountOut,
      };
    } catch (error) {
      throw new Error("Failed to fetch orders from NEAR Intents API");
    }
  }
}
const tokens = [
  {
    "assetId": "nep141:wrap.near",
    "decimals": 24,
    "blockchain": "near",
    "symbol": "wNEAR",
    "price": 2.31,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "wrap.near"
  },
  {
    "assetId": "nep141:eth.bridge.near",
    "decimals": 18,
    "blockchain": "near",
    "symbol": "ETH",
    "price": 1789.37,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "eth.bridge.near"
  },
  {
    "assetId": "nep141:17208628f84f5d6ad33f0da3bbbeb27ffcb398eac501a31bd6ad2011e36133a1",
    "decimals": 6,
    "blockchain": "near",
    "symbol": "USDC",
    "price": 0.999997,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "17208628f84f5d6ad33f0da3bbbeb27ffcb398eac501a31bd6ad2011e36133a1"
  },
  {
    "assetId": "nep141:usdt.tether-token.near",
    "decimals": 6,
    "blockchain": "near",
    "symbol": "USDT",
    "price": 0.999986,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "usdt.tether-token.near"
  },
  {
    "assetId": "nep141:token.v2.ref-finance.near",
    "decimals": 18,
    "blockchain": "near",
    "symbol": "REF",
    "price": 0.074314,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "token.v2.ref-finance.near"
  },
  {
    "assetId": "nep141:853d955acef822db058eb8505911ed77f175b99e.factory.bridge.near",
    "decimals": 18,
    "blockchain": "near",
    "symbol": "FRAX",
    "price": 0.999937,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "853d955acef822db058eb8505911ed77f175b99e.factory.bridge.near"
  },
  {
    "assetId": "nep141:aaaaaa20d9e0e2461697782ef11675f668207961.factory.bridge.near",
    "decimals": 18,
    "blockchain": "near",
    "symbol": "AURORA",
    "price": 0.087673,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "aaaaaa20d9e0e2461697782ef11675f668207961.factory.bridge.near"
  },
  {
    "assetId": "nep141:2260fac5e5542a773aa44fbcfedf7c193bc2c599.factory.bridge.near",
    "decimals": 8,
    "blockchain": "near",
    "symbol": "wBTC",
    "price": 95091,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "2260fac5e5542a773aa44fbcfedf7c193bc2c599.factory.bridge.near"
  },
  {
    "assetId": "nep141:blackdragon.tkn.near",
    "decimals": 24,
    "blockchain": "near",
    "symbol": "BLACKDRAGON",
    "price": 1.4335e-8,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "blackdragon.tkn.near"
  },
  {
    "assetId": "nep141:token.0xshitzu.near",
    "decimals": 18,
    "blockchain": "near",
    "symbol": "SHITZU",
    "price": 0.00186062,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "token.0xshitzu.near"
  },
  {
    "assetId": "nep141:purge-558.meme-cooking.near",
    "decimals": 18,
    "blockchain": "near",
    "symbol": "PURGE",
    "price": 0.00859708,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "purge-558.meme-cooking.near"
  },
  {
    "assetId": "nep141:token.burrow.near",
    "decimals": 18,
    "blockchain": "near",
    "symbol": "BRRR",
    "price": 0.00215656,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "token.burrow.near"
  },
  {
    "assetId": "nep141:abg-966.meme-cooking.near",
    "decimals": 18,
    "blockchain": "near",
    "symbol": "ABG",
    "price": 0,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "abg-966.meme-cooking.near"
  },
  {
    "assetId": "nep141:noear-324.meme-cooking.near",
    "decimals": 18,
    "blockchain": "near",
    "symbol": "NOEAR",
    "price": 0,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "noear-324.meme-cooking.near"
  },
  {
    "assetId": "nep141:mpdao-token.near",
    "decimals": 6,
    "blockchain": "near",
    "symbol": "mpDAO",
    "price": 0.01792173,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "mpdao-token.near"
  },
  {
    "assetId": "nep141:zec.omft.near",
    "decimals": 8,
    "blockchain": "zec",
    "symbol": "ZEC",
    "price": 36.4693,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z"
  },
  {
    "assetId": "nep141:gnear-229.meme-cooking.near",
    "decimals": 18,
    "blockchain": "near",
    "symbol": "GNEAR",
    "price": 0,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "gnear-229.meme-cooking.near"
  },
  {
    "assetId": "nep141:eth.omft.near",
    "decimals": 18,
    "blockchain": "eth",
    "symbol": "ETH",
    "price": 1789.37,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z"
  },
  {
    "assetId": "nep141:eth-0xcbb7c0000ab88b473b1f5afd9ef808440eed33bf.omft.near",
    "decimals": 8,
    "blockchain": "eth",
    "symbol": "cbBTC",
    "price": 95154,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "0xcbb7c0000ab88b473b1f5afd9ef808440eed33bf"
  },
  {
    "assetId": "nep141:btc.omft.near",
    "decimals": 8,
    "blockchain": "btc",
    "symbol": "BTC",
    "price": 95091,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z"
  },
  {
    "assetId": "nep141:sol.omft.near",
    "decimals": 9,
    "blockchain": "sol",
    "symbol": "SOL",
    "price": 145.02,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z"
  },
  {
    "assetId": "nep141:arb-0x912ce59144191c1204e64559fe8253a0e49e6548.omft.near",
    "decimals": 18,
    "blockchain": "arb",
    "symbol": "ARB",
    "price": 0.304832,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "0x912ce59144191c1204e64559fe8253a0e49e6548"
  },
  {
    "assetId": "nep141:doge.omft.near",
    "decimals": 8,
    "blockchain": "doge",
    "symbol": "DOGE",
    "price": 0.169171,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z"
  },
  {
    "assetId": "nep141:xrp.omft.near",
    "decimals": 6,
    "blockchain": "xrp",
    "symbol": "XRP",
    "price": 2.14,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z"
  },
  {
    "assetId": "nep141:token.sweat",
    "decimals": 18,
    "blockchain": "near",
    "symbol": "SWEAT",
    "price": 0.00431914,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "token.sweat"
  },
  {
    "assetId": "nep141:eth-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.omft.near",
    "decimals": 6,
    "blockchain": "eth",
    "symbol": "USDC",
    "price": 0.999997,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
  },
  {
    "assetId": "nep141:eth-0xdac17f958d2ee523a2206206994597c13d831ec7.omft.near",
    "decimals": 6,
    "blockchain": "eth",
        "symbol": "USDT",
    "price": 0.999986,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "0xdac17f958d2ee523a2206206994597c13d831ec7"
  },
  {
    "assetId": "nep141:eth-0xa35923162c49cf95e6bf26623385eb431ad920d3.omft.near",
    "decimals": 18,
    "blockchain": "eth",
    "symbol": "TURBO",
    "price": 0.00551909,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "0xa35923162c49cf95e6bf26623385eb431ad920d3"
  },
  {
    "assetId": "nep141:sol-b9c68f94ec8fd160137af8cdfe5e61cd68e2afba.omft.near",
    "decimals": 6,
    "blockchain": "sol",
    "symbol": "WIF",
    "price": 0.544908,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm"
  },
  {
    "assetId": "nep141:sol-57d087fd8c460f612f8701f5499ad8b2eec5ab68.omft.near",
    "decimals": 6,
    "blockchain": "sol",
    "symbol": "BOME",
    "price": 0.0013582,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "ukHH6c7mMyiWCf1b9pnWe25TSpkDDt3H5pQZgZ74J82"
  },
  {
    "assetId": "nep141:sol-c58e6539c2f2e097c251f8edf11f9c03e581f8d4.omft.near",
    "decimals": 6,
    "blockchain": "sol",
    "symbol": "TRUMP",
    "price": 10.92,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN"
  },
  {
    "assetId": "nep141:sol-d600e625449a4d9380eaf5e3265e54c90d34e260.omft.near",
    "decimals": 6,
    "blockchain": "sol",
    "symbol": "MELANIA",
    "price": 0.314317,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "FUAfBo2jgks6gB4Z4LfZkqSZgzNucisEHqnNebaRxM1P"
  },
  {
    "assetId": "nep141:eth-0x6b175474e89094c44da98b954eedeac495271d0f.omft.near",
    "decimals": 18,
    "blockchain": "eth",
    "symbol": "DAI",
    "price": 0.999792,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "0x6b175474e89094c44da98b954eedeac495271d0f"
  },
  {
    "assetId": "nep141:gnosis-0x9c58bacc331c9aa871afd802db6379a98e80cedb.omft.near",
    "decimals": 18,
    "blockchain": "gnosis",
    "symbol": "GNO",
    "price": 107.6,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "0x9c58bacc331c9aa871afd802db6379a98e80cedb"
  },
  {
    "assetId": "nep141:gnosis-0x177127622c4a00f3d409b75571e12cb3c8973d3c.omft.near",
    "decimals": 18,
    "blockchain": "gnosis",
    "symbol": "COW",
    "price": 0.270124,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "0x177127622c4a00f3d409b75571e12cb3c8973d3c"
  },
  {
    "assetId": "nep141:gnosis-0x4d18815d14fe5c3304e87b3fa18318baa5c23820.omft.near",
    "decimals": 18,
    "blockchain": "gnosis",
    "symbol": "SAFE",
    "price": 0.46539,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "0x4d18815d14fe5c3304e87b3fa18318baa5c23820"
  },
  {
    "assetId": "nep141:bera.omft.near",
    "decimals": 18,
    "blockchain": "bera",
    "symbol": "BERA",
    "price": 2.87,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z"
  },
  {
    "assetId": "nep141:bsc.omft.near",
    "decimals": 18,
    "blockchain": "bsc",
    "symbol": "BNB",
    "price": 601.03,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z"
  },
  {
    "assetId": "nep141:pol.omft.near",
    "decimals": 18,
    "blockchain": "pol",
    "symbol": "POL",
    "price": 0.214584,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z"
  },
  {
    "assetId": "nep141:base-0x98d0baa52b2d063e780de12f615f963fe8537553.omft.near",
    "decimals": 18,
    "blockchain": "base",
    "symbol": "KAITO",
    "price": 0.921007,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "0x98d0baa52b2d063e780de12f615f963fe8537553"
  },
  {
    "assetId": "nep141:tron.omft.near",
    "decimals": 6,
    "blockchain": "tron",
    "symbol": "TRX",
    "price": 0.245433,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z"
  },
  {
    "assetId": "nep141:base.omft.near",
    "decimals": 18,
    "blockchain": "base",
    "symbol": "ETH",
    "price": 1789.37,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z"
  },
  {
    "assetId": "nep141:base-0x833589fcd6edb6e08f4c7c32d4f71b54bda02913.omft.near",
    "decimals": 6,
    "blockchain": "base",
    "symbol": "USDC",
    "price": 0.999997,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913"
  },
  {
    "assetId": "nep141:base-0x532f27101965dd16442e59d40670faf5ebb142e4.omft.near",
    "decimals": 18,
    "blockchain": "base",
    "symbol": "BRETT",
    "price": 0.04960338,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "0x532f27101965dd16442e59d40670faf5ebb142e4"
  },
  {
    "assetId": "nep141:arb.omft.near",
    "decimals": 18,
    "blockchain": "arb",
    "symbol": "ETH",
    "price": 1789.37,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z"
  },
  {
    "assetId": "nep141:arb-0xaf88d065e77c8cc2239327c5edb3a432268e5831.omft.near",
    "decimals": 6,
    "blockchain": "arb",
    "symbol": "USDC",
    "price": 0.999997,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "0xaf88d065e77c8cc2239327c5edb3a432268e5831"
  },
  {
    "assetId": "nep141:arb-0xfc5a1a6eb076a2c7ad06ed22c90d7e710e35ad0a.omft.near",
    "decimals": 18,
    "blockchain": "arb",
    "symbol": "GMX",
    "price": 12.97,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "0xfc5a1a6eb076a2c7ad06ed22c90d7e710e35ad0a"
  },
  {
    "assetId": "nep141:eth-0xaaee1a9723aadb7afa2810263653a34ba2c21c7a.omft.near",
    "decimals": 18,
    "blockchain": "eth",
    "symbol": "MOG",
    "price": 6.23676e-7,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "0xaaee1a9723aadb7afa2810263653a34ba2c21c7a"
  },
  {
    "assetId": "nep141:eth-0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9.omft.near",
    "decimals": 18,
    "blockchain": "eth",
    "symbol": "AAVE",
    "price": 173.22,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9"
  },
  {
    "assetId": "nep141:eth-0x1f9840a85d5af5bf1d1762f925bdaddc4201f984.omft.near",
    "decimals": 18,
    "blockchain": "eth",
    "symbol": "UNI",
    "price": 4.9,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984"
  },
  {
    "assetId": "nep141:eth-0x514910771af9ca656af840dff83e8264ecf986ca.omft.near",
    "decimals": 18,
    "blockchain": "eth",
    "symbol": "LINK",
    "price": 13.61,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "0x514910771af9ca656af840dff83e8264ecf986ca"
  },
  {
    "assetId": "nep141:eth-0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce.omft.near",
    "decimals": 18,
    "blockchain": "eth",
    "symbol": "SHIB",
    "price": 0.0000126,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce"
  },
  {
    "assetId": "nep141:eth-0x6982508145454ce325ddbe47a25d4ec3d2311933.omft.near",
    "decimals": 18,
    "blockchain": "eth",
    "symbol": "PEPE",
    "price": 0.00000791,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "0x6982508145454ce325ddbe47a25d4ec3d2311933"
  },
  {
    "assetId": "nep141:aurora",
    "decimals": 18,
    "blockchain": "near",
    "symbol": "ETH(DEPRECATED)",
    "price": 1789.37,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "aurora"
  },
  {
    "assetId": "nep141:nbtc.bridge.near",
    "decimals": 8,
    "blockchain": "near",
    "symbol": "BTC",
    "price": 95091,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "nbtc.bridge.near"
  },
  {
    "assetId": "nep141:a35923162c49cf95e6bf26623385eb431ad920d3.factory.bridge.near",
    "decimals": 18,
    "blockchain": "near",
    "symbol": "TURBO",
    "price": 0.00551909,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "a35923162c49cf95e6bf26623385eb431ad920d3.factory.bridge.near"
  },
  {
    "assetId": "nep141:arb-0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9.omft.near",
    "decimals": 6,
    "blockchain": "arb",
    "symbol": "USDT",
    "price": 0.999986,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9"
  },
  {
    "assetId": "nep141:eth-0xaaaaaa20d9e0e2461697782ef11675f668207961.omft.near",
    "decimals": 18,
    "blockchain": "eth",
    "symbol": "AURORA",
    "price": 0.087673,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "0xaaaaaa20d9e0e2461697782ef11675f668207961"
  },
  {
    "assetId": "nep141:sol-5ce3bf3a31af18be40ba30f721101b4341690186.omft.near",
    "decimals": 6,
    "blockchain": "sol",
    "symbol": "USDC",
    "price": 0.999997,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
  },
  {
    "assetId": "nep141:sol-c800a4bd850783ccb82c2b2c7e84175443606352.omft.near",
    "decimals": 6,
    "blockchain": "sol",
    "symbol": "USDT",
    "price": 0.999986,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"
  },
  {
    "assetId": "nep141:sol-df27d7abcc1c656d4ac3b1399bbfbba1994e6d8c.omft.near",
    "decimals": 8,
    "blockchain": "sol",
    "symbol": "TURBO",
    "price": 0.00551909,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "2Dyzu65QA9zdX1UeE7Gx71k7fiwyUK6sZdrvJ7auq5wm"
  },
  {
    "assetId": "nep141:gnosis.omft.near",
    "decimals": 18,
    "blockchain": "gnosis",
    "symbol": "xDAI",
    "price": 0.997998,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z"
  },
  {
    "assetId": "nep141:gnosis-0x2a22f9c3b484c3629090feed35f17ff8f88f76f0.omft.near",
    "decimals": 6,
    "blockchain": "gnosis",
    "symbol": "USDC",
    "price": 0.999997,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "0x2a22f9c3b484c3629090feed35f17ff8f88f76f0"
  },
  {
    "assetId": "nep141:gnosis-0x6a023ccd1ff6f2045c3309768ead9e68f978f6e1.omft.near",
    "decimals": 18,
    "blockchain": "gnosis",
    "symbol": "WETH",
    "price": 1789.37,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "0x6a023ccd1ff6f2045c3309768ead9e68f978f6e1"
  },
  {
    "assetId": "nep141:pol-0x3c499c542cef5e3811e1192ce70d8cc03d5c3359.omft.near",
    "decimals": 6,
    "blockchain": "pol",
    "symbol": "USDC",
    "price": 0.999997,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359"
  },
  {
    "assetId": "nep141:bsc-0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d.omft.near",
    "decimals": 18,
    "blockchain": "bsc",
    "symbol": "USDC",
    "price": 0.999997,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d"
  },
  {
    "assetId": "nep141:bsc-0x55d398326f99059ff775485246999027b3197955.omft.near",
    "decimals": 18,
    "blockchain": "bsc",
    "symbol": "USDT",
    "price": 0.999986,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "0x55d398326f99059ff775485246999027b3197955"
  },
  {
    "assetId": "nep141:d9c2d319cd7e6177336b0a9c93c21cb48d84fb54.factory.bridge.near",
    "decimals": 18,
    "blockchain": "near",
    "symbol": "HAPI",
    "price": 3.45,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "d9c2d319cd7e6177336b0a9c93c21cb48d84fb54.factory.bridge.near"
  },
  {
    "assetId": "nep141:eth-0xd9c2d319cd7e6177336b0a9c93c21cb48d84fb54.omft.near",
    "decimals": 18,
    "blockchain": "eth",
    "symbol": "HAPI",
    "price": 3.45,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "0xd9c2d319cd7e6177336b0a9c93c21cb48d84fb54"
  },
  {
    "assetId": "nep141:base-0xcbb7c0000ab88b473b1f5afd9ef808440eed33bf.omft.near",
    "decimals": 8,
    "blockchain": "base",
    "symbol": "cbBTC",
    "price": 95154,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "0xcbb7c0000ab88b473b1f5afd9ef808440eed33bf"
  },
  {
    "assetId": "nep141:tron-d28a265909efecdcee7c5028585214ea0b96f015.omft.near",
    "decimals": 6,
    "blockchain": "tron",
    "symbol": "USDT",
    "price": 0.999986,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t"
  },
  {
    "assetId": "nep141:base-0xa5c67d8d37b88c2d88647814da5578128e2c93b2.omft.near",
    "decimals": 18,
    "blockchain": "base",
    "symbol": "FMS",
    "price": 0,
    "priceUpdatedAt": "2025-05-06T19:41:35.221Z",
    "contractAddress": "0xa5c67d8d37b88c2d88647814da5578128e2c93b2"
  }
]

// Export a singleton instance
export const nearintentService = new NearIntentService();

// Export the class for testing or custom instantiation
export default NearIntentService;