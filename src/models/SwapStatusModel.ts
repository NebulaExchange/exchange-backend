export interface SwapStatusModel {
  status: string;
  sourceChainHashes?: string[];
  sourceChainTxUrls?: string[];
  processorHashes?: string[];
  targetChainHashes?: string[];
  targetChainTxUrls?: string[];
}