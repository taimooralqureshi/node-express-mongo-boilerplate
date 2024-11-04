import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { config } from 'dotenv';
import { readFileSync } from 'fs';

import swaggerUi from 'swagger-ui-express';
import connectDB from './config/db.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import createError from 'http-errors';

config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Connect to Database
connectDB();

const swaggerDocument = JSON.parse(
  readFileSync(new URL('./swagger/swagger.json', import.meta.url), 'utf8')
);
// Define Routes
app.use('/api/feedback', feedbackRoutes); // Use feedback routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // Swagger UI

// Handle undefined routes
app.use((next) => {
  next(createError(404, 'Route not found'));
});

// Centralized error handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
