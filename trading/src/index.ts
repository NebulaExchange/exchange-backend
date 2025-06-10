import dotenv from 'dotenv';
dotenv.config();

import { app } from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`📚 Swagger UI available at http://localhost:${PORT}/`);
  console.log(`📋 Swagger JSON available at http://localhost:${PORT}/swagger.json`);
});