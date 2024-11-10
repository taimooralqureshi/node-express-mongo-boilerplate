import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node Express MongoDB Boilerplate',
      version: '1.0.0',
      description:
        'A boilerplate for creating REST APIs with Node, Express, and MongoDB',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Local server',
      },
    ],
    components: {
      securitySchemes: {
        xAuthToken: {
          type: 'apiKey',
          in: 'header',
          name: 'x-auth-token',
          description: 'Custom header for user authentication',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ xAuthToken: [] }],
  },
  apis: ['./src/routes/*.js'],
};

export const swaggerDocs = swaggerJsdoc(swaggerOptions);

export const swaggerUiOptions = {
  swaggerOptions: {
    authAction: {
      xAuthToken: {
        name: 'xAuthToken',
        schema: {
          type: 'apiKey',
          in: 'header',
          name: 'x-auth-token',
          description: 'Custom header for user authentication',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        value: 'token', // Replace with your JWT token
      },
    },
  },
};
