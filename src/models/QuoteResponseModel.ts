import { Example} from 'tsoa';
import { OrderQuoteResponse as CowswapQuote } from "@cowprotocol/cow-sdk";
import { QuoteResponse as NearIntentsQuote } from "@defuse-protocol/one-click-sdk-typescript";

export class QuoteResponseModel {
  @Example("10000")
  public amountTo!: string;
  @Example("100000000000")
  public amountFrom!: string;

  public originalQuote!: CowswapQuote | NearIntentsQuote;

  @Example("COWSWAP")
  public quoteSource!: "NEARINTENTS" | "COWSWAP" | "1INCH";
}
