import {
  Controller,
  Get,
  Route,
  Tags,
  Response,
} from 'tsoa';
import { nearintentService } from '../services/nearIntentService';
import { SwapStatusModel } from '../models/SwapStatusModel';

@Route("swap")
@Tags("Swap")
export class SwapController extends Controller {
  @Get("/status/{id}")
  @Response<SwapStatusModel>("200", "Status successfully retrieved")
  @Response("404", "No swap found")
  public async getSwapStatus(id: string): Promise<SwapStatusModel | undefined> {
    const status = await nearintentService.GetStatus(id);
    if (!status) this.setStatus(404);
    return status;
  }
}