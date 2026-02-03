# 🏗️ Arquitectura de tu Proyecto

Esta guía visual te muestra cómo está organizado todo.

---

## 📊 Diagrama General

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENTE (Frontend)                      │
│  (React/HTML en localhost:5173, 5500 o puerto de Vite)          │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                 ┌────────┴────────┐
                 │                 │
        ┌────────▼─────────┐  ┌───▼────────────┐
        │                  │  │                │
        │  AUTH SERVICE    │  │  USER SERVICE  │
        │  (3001)          │  │  (3002)        │
        │                  │  │                │
        └──────────────────┘  └────────────────┘
                │                     │
        ┌───────▼──────┐      ┌──────▼────────┐
        │              │      │               │
        │   PostgreSQL │      │  PostgreSQL   │
        │   (auth_db)  │      │  (user_db)    │
        │              │      │               │
        └──────────────┘      └───────────────┘
```

---

## 🔄 Flujo de Autenticación

```
1. USUARIO REGISTRA
   ┌──────────────┐
   │  Frontend    │─── POST /auth/register ──→ Auth Service
   └──────────────┘
                                    │
                        ┌───────────┼───────────┐
                        │           │           │
                        ▼           ▼           ▼
                   Valida    Crea en BD    Llama User Service
                     datos        │              │
                                  │              ▼
                                  │        Crea perfil
                                  │        en User BD
                                  │
                        ┌─────────┴────────┐
                        │                  │
                        ▼                  ▼
                   Genera JWT         Responde OK
                        │
        ┌───────────────┴───────────────┐
        │                               │
        ▼                               ▼
   Envía token                 Frontend guarda
    al frontend                  en localStorage
        │
        └──→ Ahora Frontend puede usar el token
             en Authorization header
```

---

## 🔐 Cómo Funciona JWT

```
LOGIN
└─→ POST /auth/login
    ├─ Usuario entra email + password
    └─ Servidor verifica en BD
        └─ ✅ Válido
           └─ Crea TOKEN JWT
              └─ Firma con JWT_SECRET
                 └─ Envía a cliente

USAR TOKEN
└─→ GET /users/me
    ├─ Cliente envía en header: Authorization: Bearer <TOKEN>
    └─ Servidor verifica TOKEN
        ├─ Verifica firma (¿es válido?)
        ├─ Verifica expiración (¿no pasaron 8 horas?)
        ├─ Extrae info del usuario (id, rol)
        └─ ✅ O ❌ da acceso
```

---

## 📁 Estructura de Carpetas

```
notasProyecto/
├─ Backend/
│  │
│  ├─ auth-service/
│  │  ├─ src/
│  │  │  ├─ app.js                 (Setup Express + Swagger)
│  │  │  ├─ swagger.js             (Configuración Swagger) ⭐
│  │  │  ├─ prisma.js              (Conexión BD)
│  │  │  ├─ controllers/
│  │  │  │  ├─ auth.controller.js  (Lógica login/register)
│  │  │  │  └─ user.controller.js  (Lógica usuarios)
│  │  │  ├─ routes/
│  │  │  │  ├─ auth.routes.js      (Documentado ⭐)
│  │  │  │  └─ user.routes.js      (Documentado ⭐)
│  │  │  ├─ middlewares/
│  │  │  │  ├─ auth.middleware.js  (Verifica JWT)
│  │  │  │  └─ role.middleware.js  (Verifica permisos)
│  │  │  └─ services/
│  │  │     └─ auth.service.js     (Lógica de auth)
│  │  ├─ prisma/
│  │  │  ├─ schema.prisma          (Modelo BD)
│  │  │  └─ migrations/            (Historial cambios BD)
│  │  ├─ server.js                 (Inicia en puerto 3001)
│  │  ├─ package.json              (Dependencias + Swagger)
│  │  └─ node_modules/
│  │
│  └─ user-service/
│     ├─ src/
│     │  ├─ app.js                 (Setup Express + Swagger)
│     │  ├─ swagger.js             (Configuración Swagger) ⭐
│     │  ├─ prisma.js
│     │  ├─ controllers/
│     │  │  └─ user.controller.js
│     │  ├─ routes/
│     │  │  └─ user.routes.js      (Documentado ⭐)
│     │  ├─ middlewares/
│     │  │  ├─ auth.middleware.js
│     │  │  └─ role.middleware.js
│     │  └─ services/
│     │     └─ user.service.js
│     ├─ prisma/
│     │  ├─ schema.prisma
│     │  └─ migrations/
│     ├─ server.js                 (Inicia en puerto 3002)
│     ├─ package.json              (Dependencias + Swagger)
│     └─ node_modules/
│
├─ Frontend/
│  ├─ auth-front/
│  │  ├─ src/
│  │  │  ├─ services/
│  │  │  │  └─ authService.js      (Llamadas API)
│  │  │  └─ ...
│  │  └─ ...
│  │
│  └─ user-front/
│     ├─ js/
│     │  ├─ auth.js
│     │  ├─ usuarios.js
│     │  └─ ...
│     └─ ...
│
└─ 📚 DOCUMENTACIÓN
   ├─ README.txt                    (ÍNDICE - ¡LEE PRIMERO!)
   ├─ INICIO_AQUI.txt               (Guía rápida)
   ├─ SWAGGER_QUICK_START.md        (Cómo usar Swagger)
   ├─ API_DOCUMENTATION.md          (Documentación técnica)
   ├─ EJEMPLOS_PRACTICOS.md         (Ejemplos de código)
   ├─ RESUMEN_FINAL.md              (Resumen de todo)
   ├─ DOCUMENTACION_REALIZADA.md    (Qué se hizo)
   └─ ARQUITECTURA.md               (Este archivo)
```

---

## 🔌 Flujo de Datos

```
REGISTRO
┌────────────────┐
│    Frontend    │
│   (Registro)   │
└────────┬───────┘
         │
         │ POST /auth/register
         │ {email, password, nombre, apellido, rol}
         ▼
┌────────────────────┐
│   Auth Service     │
│   (3001)           │
├────────────────────┤
│ 1. Validar datos   │
│ 2. Hash password   │
│ 3. Guardar en BD   │
│ 4. Crear JWT       │
│ 5. Llamar a        │
│    User Service    │
└────────┬───────────┘
         │
    ┌────┴────┐
    │          │
    │          └─→ POST /users → User Service
    │                           Guardar perfil
    │
    └─→ Responde con token
         al Frontend
         │
         ▼
    Frontend:
    - Guarda token
    - Redirige a home
```

```
LOGIN Y USO
┌────────────────┐
│    Frontend    │
│    (Login)     │
└────────┬───────┘
         │
         │ POST /auth/login
         │ {email, password}
         ▼
┌────────────────────┐
│   Auth Service     │
│   (3001)           │
├────────────────────┤
│ 1. Buscar usuario  │
│ 2. Verificar pass  │
│ 3. Crear JWT       │
│ 4. Enviar token    │
└────────┬───────────┘
         │
         │ TOKEN en respuesta
         ▼
    Frontend:
    - Guarda token
    - Lo incluye en Authorization header
         │
         │ Authorization: Bearer <TOKEN>
         ▼
┌────────────────────┐
│   Auth Service     │
│   (3001)           │
├────────────────────┤
│ GET /users/me      │
│ Verifica JWT       │
│ Retorna datos      │
└────────┬───────────┘
         │
         ▼
    Frontend:
    - Muestra datos del usuario
```

---

## 🗄️ Base de Datos

```
AUTH SERVICE DATABASE (auth_db)
┌─────────────────────────────────┐
│  tabla: User                    │
├─────────────────────────────────┤
│ id          (string, PK)        │
│ email       (string, unique)    │
│ password    (string, hashed)    │
│ nombre      (string)            │
│ apellido    (string)            │
│ rol         (enum: 4 valores)   │
│ createdAt   (timestamp)         │
│ updatedAt   (timestamp)         │
└─────────────────────────────────┘

USER SERVICE DATABASE (user_db)
┌─────────────────────────────────┐
│  tabla: Usuario                 │
├─────────────────────────────────┤
│ id          (string, PK)        │
│ nombre      (string)            │
│ apellido    (string)            │
│ email       (string)            │
│ rol         (enum: 4 valores)   │
│ createdAt   (timestamp)         │
│ updatedAt   (timestamp)         │
└─────────────────────────────────┘
```

---

## 🔄 Comunicación Entre Servicios

```
Auth Service → User Service (intra-service call)

Cuando se registra un usuario:
1. Auth Service crea usuario en su BD
2. Auth Service LLAMA a User Service (HTTP POST /users)
3. User Service guarda el perfil
4. Todo OK → Usuario registrado en ambas BDs

Código en auth.controller.js:
axios.post('http://localhost:3002/users', {...})
```

---

## 🛡️ Capas de Seguridad

```
┌─────────────────────────────────────────┐
│          CLIENTE (Frontend)             │
├─────────────────────────────────────────┤
  ↓ HTTPS (recomendado en producción)
┌─────────────────────────────────────────┐
│  CORS Middleware                        │  ← Bloquea orígenes no permitidos
├─────────────────────────────────────────┤
  ↓
┌─────────────────────────────────────────┐
│  Auth Middleware (verifyToken)          │  ← Valida JWT
├─────────────────────────────────────────┤
  ↓
┌─────────────────────────────────────────┐
│  Role Middleware (allowRoles)           │  ← Verifica permisos
├─────────────────────────────────────────┤
  ↓
┌─────────────────────────────────────────┐
│  Controller (lógica segura)             │  ← Procesa request
├─────────────────────────────────────────┤
  ↓
┌─────────────────────────────────────────┐
│  Prisma (ORM)                           │  ← Previene SQL injection
├─────────────────────────────────────────┤
  ↓
┌─────────────────────────────────────────┐
│  Base de Datos (PostgreSQL)             │  ← Passwords hasheados
├─────────────────────────────────────────┘

Las contraseñas se hashean con bcryptjs
```

---

## 📡 Puertos Usados

```
3001 → Auth Service
  - GET/POST /auth/*
  - GET /users/me
  - GET /api-docs (Swagger)
  - GET /api-spec (especificación JSON)

3002 → User Service
  - POST /users
  - GET /users
  - GET /users/me
  - GET /api-docs (Swagger)
  - GET /api-spec (especificación JSON)

5173 → Frontend Vite (React)
5500 → Frontend Live Server (HTML)

5432 → PostgreSQL (Base de datos)
```

---

## 🔍 Cómo se Documenta con Swagger

```
1. En routes/auth.routes.js, ANTES de cada endpoint:

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar nuevo usuario
 *     description: ...
 *     requestBody:
 *     responses:
 */

2. swagger.js LEE estos comentarios

3. Swagger UI GENERA la interfaz interactiva

4. Cuando recargamos Swagger, se actualiza automáticamente
```

---

## 🚀 Ciclo de Desarrollo

```
1. Crear endpoint en routes/
2. Agregar comentario @swagger
3. npm run dev (servidor reinicia)
4. Abrir http://localhost:3001/api-docs
5. Ver endpoint documentado automáticamente
6. Probar con "Try it out"
7. Si funciona → Listo
8. Si no → Revisar logs → Corregir → Repetir
```

---

## 📚 Stack Tecnológico

```
Backend
├─ Node.js + Express (servidor HTTP)
├─ Prisma (ORM para BD)
├─ PostgreSQL (base de datos)
├─ JWT (autenticación)
├─ bcryptjs (hash de contraseñas)
├─ CORS (permiso cross-origin)
├─ Swagger UI (documentación interactiva)
└─ Nodemon (auto-reload en desarrollo)

Frontend
├─ React (auth-front)
├─ HTML + CSS + JS vanilla (user-front)
├─ Fetch API (llamadas HTTP)
└─ LocalStorage (guardar token)

Documentación
├─ Markdown
├─ Swagger/OpenAPI 3.0
└─ JSDoc
```

---

## 🎯 Próximos Pasos

```
Corto Plazo (esta semana)
├─ Probar todos los endpoints
├─ Verificar JWT funcione
└─ Integrar con Frontend

Mediano Plazo (este mes)
├─ Agregar más endpoints
├─ Mejorar validaciones
├─ Agregar tests
└─ Documentar más

Largo Plazo (producción)
├─ Deploy a servidor
├─ HTTPS/SSL
├─ Monitoreo y logs
├─ Rate limiting
├─ Caching
└─ CI/CD
```

---

## 💡 Tips de Arquitectura

**Ventajas de esta arquitectura:**
- ✅ Microservicios escalables
- ✅ Separación de responsabilidades
- ✅ Auth centralizado
- ✅ Fácil de documentar
- ✅ Fácil de testear

**Mejoras futuras:**
- API Gateway (enrutar a servicios)
- Service Discovery (encontrar servicios dinámicamente)
- Message Queue (comunicación asincrónica)
- Cache (Redis)
- Load Balancer (distribuir tráfico)

---

Ahora tienes una visión clara de tu arquitectura. 🎉

**Siguiente paso**: Abre http://localhost:3001/api-docs
