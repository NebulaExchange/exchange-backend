import request from 'supertest';
import {app} from '../app';
import { QuoteRequestModel } from "../models/QuoteRequestModel"; 
import { TokenModel } from '../models/TokenModel';

describe('Quote API Integration Test', () => {
  let tokens: TokenModel[];

  beforeAll(async () => {
    const res = await request(app).get('/tokens');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    tokens = res.body;
  });

  it('should generate all valid tokenFrom/tokenTo combinations and request quotes', async () => {
    for (const tokenFrom of tokens) {
      for (const tokenTo of tokens) {
        if (tokenFrom.symbol === tokenTo.symbol) continue; // skip same-token pairs

        const quoteRequest: QuoteRequestModel = {
          amount: "1000",
          accountFrom: "0x1234567890abcdef1234567890abcdef12345678",
          tokenFrom: tokenFrom.address,
          chainFrom: "eth",
          accountTo: "0x1234567890abcdef1234567890abcdef12345678",
          tokenTo: tokenTo.address,
          chainTo: "eth",
          slippage: 0.5,
          kind: "EXACT_INPUT",
          ttl: 300,
          appData: "",
          isSmartContractWallet: false,
          isNative: false,
        };

        const res = await request(app).post("/quote").send(quoteRequest);
        expect(res.status).toBeLessThan(300);
      }
    }
  });
});