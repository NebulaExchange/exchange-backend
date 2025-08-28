import { QuoteResponseModel } from "../models/QuoteResponseModel";
import { QuoteRequestModel } from "../models/QuoteRequestModel";
import { getAppInsightsClient } from '../config/appInsights';
import { tokenService } from "./tokenService";

class AuditService {
  async LogQuoteRequest(
    request: QuoteRequestModel
  ): Promise<void> {
    const client = getAppInsightsClient();
    var tokenFrom = tokenService.GetTokenByAddress(request.tokenFrom);
    var tokenTo = tokenService.GetTokenByAddress(request.tokenTo);

    client.trackEvent({
      name: "QuoteRequest",
      properties: {
        requestId: request.requestId!,
        tokenFrom: request.tokenFrom,
        chainFrom: request.chainFrom,
        tokenFromName: tokenFrom?.name ?? "",
        tokenFromDecimals: tokenFrom?.decimals ?? 1,
        tokenTo: request.tokenTo,
        chainTo: request.chainTo,
        tokenToName: tokenTo?.name ?? "",
        tokenToDecimals: tokenTo?.decimals ?? 1,
        amountFrom: request.amount,
        timestamp: new Date(),
      },
    });
  }

  async LogQuote(
    requestId: string,
    response: QuoteResponseModel
  ): Promise<void> {
    const client = getAppInsightsClient();
    client.trackEvent({
      name: "QuoteResponse",
      properties: {
        requestId: requestId,
        amountTo: response.amountTo,
        status: "OK",
        source: response.quoteSource,
        timestamp: new Date(),
      },
    });
  }

  async LogQuoteFailure(
    requestId: string,
    source: string,
    error: string
  ): Promise<void> {
    const client = getAppInsightsClient();
    client.trackEvent({
      name: "QuoteResponse",
       properties: {
        requestId: requestId,
        status: "Error",
        source: source,
        error: error,
        timestamp: new Date(),
      },
    });
  }
}

// Export a singleton instance
export const auditService = new AuditService();

// Export the class for testing or custom instantiation
export default AuditService;