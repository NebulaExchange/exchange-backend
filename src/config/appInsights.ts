import * as appInsights from 'applicationinsights';

export function setupAppInsights() {
  appInsights
    .setup(process.env.APPINSIGHTS_INSTRUMENTATIONKEY)
    .setAutoCollectConsole(true)
    .setAutoCollectExceptions(true)
    .setAutoCollectRequests(true)
    .setAutoCollectDependencies(true)
    .setUseDiskRetryCaching(true)
    .start();

  return appInsights.defaultClient;
}

export function getAppInsightsClient(): appInsights.TelemetryClient  {
    return appInsights.defaultClient;
}