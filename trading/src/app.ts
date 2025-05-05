import express, { Application } from 'express';
import apiRoutes from './routes/api';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', apiRoutes);

// Basic home route
app.get('/', (req, res) => {
  res.send('Express TypeScript API is running');
});

export default app;
