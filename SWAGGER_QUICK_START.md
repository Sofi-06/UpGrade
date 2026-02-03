# 🎯 GUÍA RÁPIDA - Cómo Ver la Documentación Swagger

## ✅ Ya está configurado y listo

Simplemente ejecuta los servicios y accede a Swagger desde tu navegador.

---

## 🚀 PASOS PARA VER LA DOCUMENTACIÓN

### Paso 1: Inicia Auth Service
```bash
cd Backend/auth-service
npm run dev
```
✅ Deberías ver: `Server running on port 3001`

### Paso 2: Inicia User Service (en otra terminal)
```bash
cd Backend/user-service
npm run dev
```
✅ Deberías ver: `Server running on port 3002`

### Paso 3: Abre en tu navegador

#### 📖 Documentación Auth Service
👉 http://localhost:3001/api-docs

#### 📖 Documentación User Service
👉 http://localhost:3002/api-docs

---

## 📝 ¿Qué Ver en Swagger?

### Auth Service Endpoints
1. **POST /auth/register** - Crear nueva cuenta
2. **POST /auth/login** - Iniciar sesión
3. **GET /users/me** - Ver mi perfil (requiere token)

### User Service Endpoints
1. **POST /users** - Crear perfil de usuario (interno)
2. **GET /users** - Ver todos los usuarios (solo admin)
3. **GET /users/me** - Ver mi perfil (requiere token)

---

## 🧪 Prueba los Endpoints en Swagger

1. Abre http://localhost:3001/api-docs o http://localhost:3002/api-docs
2. Haz clic en el endpoint que quieras probar
3. Haz clic en "Try it out"
4. Completa los datos requeridos
5. Haz clic en "Execute"

**Ejemplo**: Prueba el endpoint `/auth/register` en el Auth Service

---

## 🔒 Cómo usar el Token JWT

Algunos endpoints requieren autenticación:

1. Primero, haz login/register para obtener el token
2. En Swagger, haz clic en el botón **"Authorize"** (arriba a la derecha)
3. Coloca tu token así: `Bearer YOUR_TOKEN_HERE`
4. Ahora puedes acceder a endpoints protegidos

---

## 💡 Qué incluye la Documentación

Cada endpoint tiene:
- ✅ **Descripción** - Qué hace
- ✅ **Parámetros** - Qué datos enviar
- ✅ **Respuestas** - Qué recibirás (éxito y errores)
- ✅ **Ejemplos** - Datos de ejemplo
- ✅ **Seguridad** - Si requiere token

---

## 🎓 Estructura de la Documentación

```
Swagger UI
├─ Auth Service Endpoints (en puerto 3001)
│  ├─ Autenticación
│  │  ├─ POST /auth/register
│  │  └─ POST /auth/login
│  └─ Usuarios
│     └─ GET /users/me
│
└─ User Service Endpoints (en puerto 3002)
   ├─ POST /users
   ├─ GET /users
   └─ GET /users/me
```

---

## 🔍 Archivos Importantes

```
Backend/
├─ auth-service/
│  ├─ src/
│  │  ├─ swagger.js (configuración Swagger)
│  │  └─ routes/
│  │     ├─ auth.routes.js (documentado)
│  │     └─ user.routes.js (documentado)
│
├─ user-service/
│  ├─ src/
│  │  ├─ swagger.js (configuración Swagger)
│  │  └─ routes/
│  │     └─ user.routes.js (documentado)
```

---

## ❓ Preguntas Frecuentes

**P: ¿Por qué no veo la documentación?**
- Verifica que el puerto está correcto (3001 o 3002)
- Verifica que el servidor está corriendo

**P: ¿Puedo guardar la especificación?**
- Sí, descárgala desde:
  - http://localhost:3001/api-spec (JSON)
  - http://localhost:3002/api-spec (JSON)

**P: ¿Dónde agreggo más endpoints?**
- En los archivos de rutas (routes/*.js)
- Sigue el mismo patrón con comentarios `/** @swagger ... */`

---

## 📚 Documentación Completa

Lee el archivo `API_DOCUMENTATION.md` para más detalles sobre:
- Estructura de datos
- Ejemplos con cURL
- Variables de entorno
- Roles del sistema

---

**¡Listo! Ahora tienes toda tu API documentada con Swagger 🎉**
