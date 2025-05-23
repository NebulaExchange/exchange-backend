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
RegisterRoutes(app); // <-- Register tsoa routes here

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