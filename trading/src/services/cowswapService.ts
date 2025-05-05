import { Api, OrderQuoteResponse, OrderQuoteRequest } from '../generated/cowswap/api';

class CowswapService {
  private api: Api<undefined>;

  constructor(baseUrl: string = 'https://api.cow.fi/mainnet') {
    this.api = new Api({
      baseUrl: baseUrl,
    });
  }

  async getOrders(request: OrderQuoteRequest): Promise<OrderQuoteResponse> {
    try {
      const { data } = await this.api.api.v1QuoteCreate(request);
      return data;
    } catch (error) {
      console.error('Error fetching quote:', error);
      throw new Error('Failed to fetch orders from CoW Protocol API');
    }
  }
}

// Export a singleton instance
export const cowswapService = new CowswapService();

// Export the class for testing or custom instantiation
export default CowswapService;