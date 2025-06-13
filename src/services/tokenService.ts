import { TokenModel } from "../models/TokenModel";
import { nearintentService } from "./nearIntentService";
import { cowswapService } from "./cowswapService";

class TokenService {
  private tokens: TokenModel[];

  constructor() {
    const cowTokens = cowswapService.GetTokens();
    const nearTokens = nearintentService.GetTokens();

    this.tokens = [...cowTokens, ...nearTokens].reduce((acc, current) => {
      const x = acc.find(
        (item) =>
          item.address === current.address && item.chain === current.chain
      );
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, [] as TokenModel[]);
  }

  GetTokens(): TokenModel[] {
    return this.tokens;
  }

  GetTokenByAddress(address: string, chain?: string): TokenModel | null {
    if (chain) {
      return this.tokens.find(
        (token) =>
          token.address.toLowerCase() === address.toLowerCase() &&
          token.chain.toLowerCase() === chain.toLowerCase()
      ) ?? null;
    }
    return (
      this.tokens.find(
        (token) => token.address.toLowerCase() === address.toLowerCase()
      ) ?? null
    );
  }
}

// Export a singleton instance
export const tokenService = new TokenService();