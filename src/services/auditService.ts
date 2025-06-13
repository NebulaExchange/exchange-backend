import { QuoteResponseModel } from "../models/QuoteResponseModel";
import { QuoteRequestModel } from "../models/QuoteRequestModel";
import { getAppInsightsClient } from '../config/appInsights';

class AuditService {
  async LogQuote(
    request: QuoteRequestModel,
    response: QuoteResponseModel
  ): Promise<void> {
    const client = getAppInsightsClient();
    client.trackEvent({
      name: "Quote",
      properties: {
        tokenFrom: request.tokenFrom,
        tokenTo: request.tokenTo,
        amount: response.amountTo,
        status: "OK",
        source: response.quoteSource,
        timestamp: new Date(),
      },
    });
  }

  async LogQuoteFailure(
    request: QuoteRequestModel,
    source: string,
    error: string
  ): Promise<void> {
    const client = getAppInsightsClient();
    client.trackEvent({
      name: "Quote",
      properties: {
        tokenFrom: request.tokenFrom,
        tokenTo: request.tokenTo,
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