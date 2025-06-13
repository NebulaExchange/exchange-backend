import {
  Controller,
  Get,
  Route,
  Tags,
  Response,
} from 'tsoa';
import { tokenService } from '../services/tokenService';
import { TokenModel } from '../models/TokenModel';

@Route("tokens")
@Tags("Tokens")
export class TokenController extends Controller {
  @Get()
  @Response<TokenModel[]>("200", "Tokens successfully retrieved")
  public getTokens(): TokenModel[] {
    return tokenService.GetTokens();
  }
}