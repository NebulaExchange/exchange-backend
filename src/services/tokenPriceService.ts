import { TokenPriceModel } from "../models/TokenPriceModel";

interface CoinMarketCapResponse {
  data: {
    [key: string]: {
      id: number;
      name: string;
      symbol: string;
      quote: {
        USD: {
          price: number;
          percent_change_24h: number;
          market_cap: number;
          last_updated: string;
        };
      };
    };
  };
  status: {
    timestamp: string;
    error_code: number;
    error_message: string | null;
  };
}

class TokenPriceService {
  private readonly BASE_URL = "https://pro-api.coinmarketcap.com/v1";
  private readonly REFRESH_INTERVAL = 10 * 60 * 1000; // 10 minutes in milliseconds
  
  // Token symbols to fetch - can be expanded
  private readonly TOKENS = ["BTC", "ETH", "USDC", "USDT", "SOL"];
  
  private cachedPrices: TokenPriceModel[] = [];
  private lastFetchTime: number = 0;
  private refreshTimer: NodeJS.Timeout | null = null;
  private isInitialized = false;

  constructor() {
    this.initializeService();
  }

  private async initializeService(): Promise<void> {
    try {
      await this.fetchPrices();
      this.startAutoRefresh();
      this.isInitialized = true;
    } catch (error) {
      console.error("Failed to initialize token price service:", error);
      // Retry initialization after 30 seconds
      setTimeout(() => this.initializeService(), 30000);
    }
  }

  private async fetchPrices(): Promise<void> {
    try {
      const response = await fetch(
        `${this.BASE_URL}/cryptocurrency/quotes/latest?symbol=${this.TOKENS.join(",")}`,
        {
          headers: {
            "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY ?? "",
            "Accept": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: CoinMarketCapResponse = await response.json();
      
      if (data.status.error_code !== 0) {
        throw new Error(`CoinMarketCap API error: ${data.status.error_message}`);
      }

      this.cachedPrices = this.transformResponse(data);
      this.lastFetchTime = Date.now();
      
      console.log(`Successfully fetched prices for ${this.cachedPrices.length} tokens`);
    } catch (error) {
      console.error("Error fetching token prices:", error);
      throw error;
    }
  }

  private transformResponse(data: CoinMarketCapResponse): TokenPriceModel[] {
    return Object.values(data.data).map((token) => ({
      symbol: token.symbol,
      name: token.name,
      price: token.quote.USD.price,
      priceChangePercent24h: token.quote.USD.percent_change_24h,
      marketCap: token.quote.USD.market_cap,
      lastUpdated: new Date(token.quote.USD.last_updated),
    }));
  }

  private startAutoRefresh(): void {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
    }

    this.refreshTimer = setInterval(async () => {
      try {
        await this.fetchPrices();
      } catch (error) {
        console.error("Auto-refresh failed:", error);
      }
    }, this.REFRESH_INTERVAL);
  }

  public async getTokenPrices(): Promise<TokenPriceModel[]> {
    // If not initialized yet, wait for initialization
    if (!this.isInitialized) {
      await this.waitForInitialization();
    }

    // Check if cache is stale (older than refresh interval)
    const cacheAge = Date.now() - this.lastFetchTime;
    if (cacheAge > this.REFRESH_INTERVAL) {
      try {
        await this.fetchPrices();
      } catch (error) {
        console.warn("Failed to refresh stale cache, returning cached data:", error);
      }
    }

    return [...this.cachedPrices]; // Return a copy to prevent external modification
  }

  private async waitForInitialization(): Promise<void> {
    return new Promise((resolve) => {
      const checkInitialization = () => {
        if (this.isInitialized) {
          resolve();
        } else {
          setTimeout(checkInitialization, 100);
        }
      };
      checkInitialization();
    });
  }

  public async getTokenPrice(symbol: string): Promise<TokenPriceModel | null> {
    const prices = await this.getTokenPrices();
    return prices.find(token => token.symbol.toLowerCase() === symbol.toLowerCase()) || null;
  }

  public getLastUpdateTime(): Date | null {
    return this.lastFetchTime ? new Date(this.lastFetchTime) : null;
  }

  public getCacheAge(): number {
    return this.lastFetchTime ? Date.now() - this.lastFetchTime : 0;
  }

  public async forceRefresh(): Promise<void> {
    await this.fetchPrices();
  }

  public addToken(symbol: string): void {
    if (!this.TOKENS.includes(symbol.toUpperCase())) {
      this.TOKENS.push(symbol.toUpperCase());
      // Trigger a refresh to include the new token
      this.forceRefresh().catch(console.error);
    }
  }

  public removeToken(symbol: string): void {
    const index = this.TOKENS.indexOf(symbol.toUpperCase());
    if (index > -1) {
      this.TOKENS.splice(index, 1);
      // Remove from cache
      this.cachedPrices = this.cachedPrices.filter(
        token => token.symbol.toLowerCase() !== symbol.toLowerCase()
      );
    }
  }

  public destroy(): void {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
      this.refreshTimer = null;
    }
  }
}

// Export a singleton instance
export const tokenPriceService = new TokenPriceService();