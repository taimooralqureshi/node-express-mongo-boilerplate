import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import createError from 'http-errors';
import { config } from 'dotenv';

import { port } from './utils/helper.js';

// for quick development/testing pre-authorize swagger
// import { swaggerDocs, swaggerUiOptions } from './config/swagger.js';
import { swaggerDocs } from './config/swagger.js';
import connectDB from './config/db.js';

import errorHandler from './middleware/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';

config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Connect to Database
connectDB();

// Define Routes
app.use('/api/feedback', feedbackRoutes); // Use feedback routes
app.use('/api/auth', authRoutes); // Use auth routes
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs)
  // swaggerUi.setup(swaggerDocs, swaggerUiOptions) // pre-authorize
);

// Handle undefined routes
app.use((next) => {
  next(createError(404, 'Route not found'));
});

// Centralized error handling
app.use(errorHandler);

app.listen(port(), () => {
  console.log(`Server is running on http://localhost:${port()}`);
});
