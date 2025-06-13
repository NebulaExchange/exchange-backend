import {
  Controller,
  Post,
  Route,
  Tags,
  Body,
  Response,
} from 'tsoa';
import { QuoteRequestModel } from '../models/QuoteRequestModel';
import { cowswapService } from '../services/cowswapService';
import { nearintentService } from '../services/nearIntentService';
import { QuoteResponseModel } from '../models/QuoteResponseModel';
import { v4 as uuidv4 } from 'uuid';
import { auditService } from '../services/auditService';

@Route("quote")
@Tags("Quote")
export class QuoteController extends Controller {
  @Post()
  @Response<QuoteResponseModel>("200", "Quote successfully retrieved")
  @Response<{ error: string }>("404", "No quote found")
  public async getQuote(
    @Body() request: QuoteRequestModel
  ): Promise<QuoteResponseModel | { error: string }> {
    if (!request.requestId) request.requestId = uuidv4(); //if no request id was passed in, initialize our own
    auditService.LogQuoteRequest(request);

    const [cowQuote, nearQuote] = await Promise.all([
      cowswapService.GetQuote(request),
      nearintentService.GetQuote(request)
    ]);

    if (nearQuote) return nearQuote;
    if (cowQuote) return cowQuote;

    this.setStatus(404);
    return { error: "No quote found" };
  }
}
