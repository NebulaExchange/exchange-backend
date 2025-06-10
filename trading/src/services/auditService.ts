import { TableClient } from "@azure/data-tables";
import { QuoteResponseModel } from "../models/QuoteResponseModel";
import { QuoteRequestModel } from "../models/QuoteRequestModel";
import { randomUUID } from 'crypto';
import { DefaultAzureCredential } from "@azure/identity";

class AuditService {
  async LogQuote(
    request: QuoteRequestModel,
    response: QuoteResponseModel
  ): Promise<void> {
    const credential = new DefaultAzureCredential();
    const tableClient = new TableClient(
      "https://nebulastorageprod.table.core.windows.net",
      "quotes",
      credential
    );

    await tableClient.createEntity({
      partitionKey: new Date().toISOString().split("T")[0],
      rowKey: randomUUID(),
      tokenFrom: request.tokenFrom,
      tokenTo: request.tokenTo,
      amount: response.amountTo,
      status: "OK",
      source: response.quoteSource,
      timestamp: new Date(),
    });
  }

  async LogQuoteFailure(request: QuoteRequestModel, source: string, error: string): Promise<void> {
    const credential = new DefaultAzureCredential();
    const tableClient = new TableClient(
      "https://nebulastorageprod.table.core.windows.net",
      "quotes",
      credential
    );

    await tableClient.createEntity({
      partitionKey: new Date().toISOString().split("T")[0],
      rowKey: randomUUID(),
      tokenFrom: request.tokenFrom,
      tokenTo: request.tokenTo,
      status: "Error",
      source: source,
      error: error,
      timestamp: new Date(),
    });
  }
}

// Export a singleton instance
export const auditService = new AuditService();

// Export the class for testing or custom instantiation
export default AuditService;