import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User Service API',
      version: '1.0.0',
      description: 'Servicio de gestión de perfiles y datos de usuarios',
      contact: {
        name: 'Soporte API',
        email: 'soporte@user-service.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3002',
        description: 'Servidor de desarrollo User Service'
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
            nombre: {
              type: 'string',
              description: 'Nombre del usuario'
            },
            apellido: {
              type: 'string',
              description: 'Apellido del usuario'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email del usuario'
            },
            rol: {
              type: 'string',
              enum: ['SUPER_ADMIN', 'DIRECTIVO', 'DOCENTE', 'ESTUDIANTE'],
              description: 'Rol del usuario en el sistema'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación del usuario'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Mensaje de error'
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js']
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

export default setupSwagger;
