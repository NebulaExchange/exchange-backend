import {
  Controller,
  Get,
  Route,
  Tags,
  Response,
  Path,
  Query,
} from 'tsoa';
import { tokenService } from '../services/tokenService';
import { tokenPriceService } from '../services/tokenPriceService';
import { TokenModel } from '../models/TokenModel';
import { TokenPriceModel } from '../models/TokenPriceModel';

@Route("tokens")
@Tags("Tokens")
export class TokenController extends Controller {
  @Get()
  @Response<TokenModel[]>("200", "Tokens successfully retrieved")
  public getTokens(): TokenModel[] {
    return tokenService.GetTokens();
  }

  @Get("/prices")
  @Response<TokenPriceModel[]>("200", "Prices successfully retrieved")
  public async getTokenPrices(): Promise<TokenPriceModel[]> {
    return await tokenPriceService.getTokenPrices();
  }

  @Get("/{address}")
  public getToken(
    @Path() address: string,
    @Query() chain?: string
  ): TokenModel | null {
    const token = tokenService.GetTokenByAddress(address, chain);
    if (!token) this.setStatus(404);

    return token;
  }
}
