const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Auth Service API',
      version: '1.0.0',
      description: 'API de autenticación para gestión de usuarios y autenticación JWT',
      contact: {
        name: 'Soporte API',
        email: 'soporte@auth-service.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Servidor de desarrollo Auth Service'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Token JWT para autenticación'
        }
      },
      schemas: {
        Usuario: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID único del usuario'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email del usuario'
            },
            nombre: {
              type: 'string',
              description: 'Nombre del usuario'
            },
            apellido: {
              type: 'string',
              description: 'Apellido del usuario'
            },
            rol: {
              type: 'string',
              enum: ['SUPER_ADMIN', 'DIRECTIVO', 'DOCENTE', 'ESTUDIANTE'],
              description: 'Rol del usuario en el sistema'
            }
          },
          required: ['id', 'email', 'nombre', 'apellido', 'rol']
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Mensaje de error'
            }
          }
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string'
            },
            token: {
              type: 'string',
              description: 'Token JWT'
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/auth.routes.js']
};

const specs = swaggerJsdoc(options);

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    swaggerOptions: {
      persistAuthorization: true,
      displayOperationId: false
    },
    customCss: '.swagger-ui .topbar { display: none }'
  }));
  
  app.get('/api-spec', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });
}

module.exports = setupSwagger;
