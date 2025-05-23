import {
  Controller,
  Post,
  Route,
  Tags,
  Body,
  SuccessResponse,
  Response,
  Example,
} from 'tsoa';
import { QuoteRequestModel } from '../models/QuoteRequestModel';
import { cowswapService } from '../services/cowswapService';
import { nearintentService } from '../services/nearIntentService';
import { QuoteResponseModel } from '../models/QuoteResponseModel';

@Route("quote")
@Tags("Quote")
export class QuoteController extends Controller {
  @Post()
  @Response<QuoteResponseModel>("200", "Quote successfully retrieved")
  @Response<{ error: string }>("404", "No quote found")
  public async getQuote(
    @Body() request: QuoteRequestModel
  ): Promise<QuoteResponseModel | { error: string }> {
    const cowQuote = await cowswapService.GetQuote(request);
    const nearQuote = await nearintentService.GetQuote(request);

    if (nearQuote) return nearQuote;
    if (cowQuote) return cowQuote;

    this.setStatus(404);
    return { error: "No quote found" };
  }
}
