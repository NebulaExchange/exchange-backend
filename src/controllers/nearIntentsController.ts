import {
  Controller,
  Get,
  Route,
  Tags,
  Response,
  Path,
} from 'tsoa';
import { nearintentService } from '../services/nearIntentService';

@Route("near")
@Tags("NEAR")
export class NearIntentsController extends Controller {
  @Get("/{address}/{chain}")
  @Response<string>("200", "NEAR Intents Address")
  public getToken(
    @Path() address: string,
    @Path() chain: string
  ): string {
     return nearintentService.MapToNearAsset(chain, address);
  }
}