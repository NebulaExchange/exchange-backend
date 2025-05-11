export interface TokenModel {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  chain: string;
  logoURI: string | null;
}