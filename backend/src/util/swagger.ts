// Path: backend/src/util/swagger.ts

import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Yomicepa Task Manager API',
      version: '1.0.0',
      description: 'API documentation for the Yomicepa Task Manager application.',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

// Create the swagger spec
const swaggerSpec = swaggerJsdoc(options);

// THIS IS THE CRUCIAL LINE:
export default swaggerSpec;