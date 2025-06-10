import { useAzureMonitor } from '@azure/monitor-opentelemetry';
import { DefaultAzureCredential } from '@azure/identity';

export function setupApplicationInsights() {
  useAzureMonitor({
    azureMonitorExporterOptions: {
      connectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING,
      credential: new DefaultAzureCredential()
    }
  });
}