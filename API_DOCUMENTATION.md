# 📚 Documentación de la API - Proyecto de Gestión de Usuarios

## 📋 Descripción General

Este proyecto es una arquitectura de **microservicios** con dos servicios principales:
- **Auth Service**: Gestión de autenticación y registro
- **User Service**: Gestión de perfiles de usuarios

## 🚀 Acceso a la Documentación Swagger

### Auth Service
- **URL**: http://localhost:3001/api-docs
- **Especificación JSON**: http://localhost:3001/api-spec
- **Puerto**: 3001
- **Descripción**: Servicio de autenticación con registro y login

### User Service
- **URL**: http://localhost:3002/api-docs
- **Especificación JSON**: http://localhost:3002/api-spec
- **Puerto**: 3002
- **Descripción**: Servicio de gestión de perfiles y datos de usuarios

## 🔧 Instalación y Configuración

### Requisitos Previos
- Node.js v18+
- npm o yarn
- PostgreSQL (o base de datos compatible)

### Instalación

#### 1. Auth Service
```bash
cd Backend/auth-service
npm install
npm run dev
```

#### 2. User Service
```bash
cd Backend/user-service
npm install
npm run dev
```

## 📡 Endpoints Principales

### Auth Service (http://localhost:3001)

#### Registro de Usuario
```http
POST /auth/register
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "1234567",
  "nombre": "Juan",
  "apellido": "Perez",
  "rol": "ESTUDIANTE"
}
```

**Respuesta Exitosa (201)**:
```json
{
  "message": "Usuario creado correctamente",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "1234567"
}
```

**Respuesta Exitosa (200)**:
```json
{
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": "clk1a1b2c3d4e5f6",
    "email": "usuario@example.com",
    "nombre": "Juan",
    "apellido": "Perez",
    "rol": "ESTUDIANTE"
  }
}
```

#### Obtener Perfil del Usuario
```http
GET /users/me
Authorization: Bearer <TOKEN_JWT>
```

**Respuesta Exitosa (200)**:
```json
{
  "id": "clk1a1b2c3d4e5f6",
  "email": "usuario@example.com",
  "nombre": "Juan",
  "apellido": "Perez",
  "rol": "ESTUDIANTE"
}
```

### User Service (http://localhost:3002)

#### Crear Usuario (Interno)
```http
POST /users
Content-Type: application/json

{
  "id": "clk1a1b2c3d4e5f6",
  "nombre": "Juan",
  "apellido": "Perez",
  "email": "usuario@example.com",
  "rol": "ESTUDIANTE"
}
```

#### Obtener Perfil Autenticado
```http
GET /users/me
Authorization: Bearer <TOKEN_JWT>
```

#### Obtener Todos los Usuarios
```http
GET /users
Authorization: Bearer <TOKEN_JWT>
```
⚠️ **Requiere permisos**: Solo SUPER_ADMIN o DIRECTIVO pueden acceder

## 🔐 Autenticación

La API utiliza **JWT (JSON Web Tokens)** para autenticación. 

### Cómo usar JWT
1. Registra o inicia sesión en `/auth/register` o `/auth/login`
2. Recibirás un token en la respuesta
3. Incluye el token en el header de futuras peticiones:
   ```
   Authorization: Bearer <TOKEN>
   ```

### Token Válido Por
- **Duración**: 8 horas
- **Almacenamiento**: LocalStorage (recomendado en el frontend)

## 👥 Roles del Sistema

El sistema cuenta con 4 roles principales:

| Rol | Descripción | Permisos |
|-----|-------------|----------|
| **SUPER_ADMIN** | Administrador del sistema | Acceso total |
| **DIRECTIVO** | Director/Directora educativo | Ver usuarios, reportes |
| **DOCENTE** | Profesor/Profesora | Ver estudiantes, calificar |
| **ESTUDIANTE** | Alumno/Alumna | Ver su perfil, acceder a cursos |

## 📦 Estructura de Datos

### Usuario (Schema)
```json
{
  "id": "string (UUID)",
  "nombre": "string",
  "apellido": "string",
  "email": "string",
  "rol": "SUPER_ADMIN | DIRECTIVO | DOCENTE | ESTUDIANTE",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

## ⚙️ Configuración

### Variables de Entorno

#### Auth Service (.env)
```
PORT=3001
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/auth_db
JWT_SECRET=tu_secret_key_muy_segura
NODE_ENV=development
```

#### User Service (.env)
```
PORT=3002
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/user_db
JWT_SECRET=tu_secret_key_muy_segura
NODE_ENV=development
```

## 🐛 Troubleshooting

### Error: "Cannot find module 'swagger-ui-express'"
**Solución**: Reinstala las dependencias
```bash
npm install swagger-ui-express swagger-jsdoc
```

### Error: CORS bloqueado
**Solución**: Verifica que el origen está en la lista blanca de CORS en `app.js`

### Error: Token inválido
**Solución**: 
- Verifica que JWT_SECRET es igual en ambos servicios
- Comprueba que el token no ha expirado (8 horas)

## 📝 Ejemplos con cURL

### Registrar usuario
```bash
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "nuevo@example.com",
    "password": "1234567",
    "nombre": "Carlos",
    "apellido": "Lopez",
    "rol": "ESTUDIANTE"
  }'
```

### Login
```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "nuevo@example.com",
    "password": "1234567"
  }'
```

### Obtener perfil autenticado
```bash
curl -X GET http://localhost:3001/users/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🔄 Flujo de Autenticación

```
┌─────────────────────────────────────────────────────────┐
│                    Cliente Frontend                       │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│   1. POST /auth/register o /auth/login                   │
│   ↓ (recibe token JWT)                                   │
│   2. Guarda token en localStorage                        │
│   3. Incluye token en header Authorization               │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│              Auth Service o User Service                  │
│   Verifica JWT → Token válido → Procesa request          │
│   Token inválido → 401 Unauthorized                      │
└─────────────────────────────────────────────────────────┘
```

## 📚 Recursos Adicionales

- [Documentación oficial Swagger](https://swagger.io/tools/swagger-ui/)
- [JWT.io - Decodificar tokens](https://jwt.io/)
- [Express.js Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)

## 🙋 Soporte

Para reportar bugs o sugerencias:
1. Abre un issue en el repositorio
2. Incluye el error exacto y los pasos para reproducirlo
3. Describe el comportamiento esperado vs actual

---

**Última actualización**: Febrero 2026
**Versión**: 1.0.0
