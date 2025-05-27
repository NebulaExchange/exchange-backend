import express, { Application } from 'express';
import cors from 'cors';
import { RegisterRoutes } from './routes'; // tsoa-generated routes
import path from 'path';
import fs from 'fs';
import swaggerUi from 'swagger-ui-express';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// tsoa API routes
RegisterRoutes(app); 

import { ValidateError } from 'tsoa';
import { Request, Response, NextFunction } from 'express';

// TSOA-required error handler
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

// Serve tsoa-generated Swagger JSON
app.get('/swagger.json', (_req, res) => {
  const swaggerPath = path.join(__dirname, './swagger.json');
  const swaggerFile = fs.readFileSync(swaggerPath, 'utf8');
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerFile);
});

// Serve Swagger UI at /docs
const swaggerDocument = require('./swagger.json');
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;