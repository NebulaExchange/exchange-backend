import {
  Controller,
  Get,
  Route,
  Tags,
  Body,
  SuccessResponse,
  Response,
  Example,
} from 'tsoa';
import { cowswapService } from '../services/cowswapService';
import { nearintentService } from '../services/nearIntentService';
import { TokenModel } from '../models/TokenModel';

@Route("tokens")
@Tags("Tokens")
export class TokenController extends Controller {
  @Get()
  @Response<TokenModel[]>("200", "Tokens successfully retrieved")
  public async getTokens(
  ): Promise<TokenModel[]> {
    const cowTokens = cowswapService.GetTokens();
    const nearTokens = nearintentService.GetTokens();

    var tokens = [...cowTokens, ...nearTokens].reduce((acc, current) => {
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

    return tokens;
  }
}