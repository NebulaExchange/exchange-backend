import express, { Application } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import swaggerUi from 'swagger-ui-express';
import { ValidateError } from 'tsoa';
import { setupApplicationInsights } from './config/appInsights';
import { Request, Response, NextFunction } from 'express';
import { RegisterRoutes } from './routes'; 

const appInsightsClient = setupApplicationInsights();
const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// TSOA API routes
RegisterRoutes(app); 

// TSOA-required error handler with Application Insights
app.use(function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  if (err instanceof ValidateError) {
    console.warn(`Validation failed:`, err.fields);
    return res.status(422).json({
      message: 'Validation Failed',
      details: err?.fields,
    });
  }
  
  if (err instanceof Error) {
    console.error(err);
    
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }

  next();
});

// Serve TSOA-generated Swagger JSON with telemetry
app.get('/swagger.json', (_req, res) => {
    const swaggerPath = path.join(__dirname, './swagger.json');
    const swaggerFile = fs.readFileSync(swaggerPath, 'utf8');
    
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerFile);
});

// Serve Swagger UI at /docs
const swaggerDocument = require('./swagger.json');
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export { app, appInsightsClient };