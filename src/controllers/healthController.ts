// src/controllers/healthController.ts
import { Get, Route } from 'tsoa';

@Route('health')
export class HealthController {
  @Get('/')
  public async checkHealth(): Promise<{ status: string }> {
    return { status: 'healthy' };
  }
}