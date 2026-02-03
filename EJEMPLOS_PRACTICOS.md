# 🧪 Ejemplos Prácticos - Cómo Usar la API

Esta guía te muestra ejemplos reales de cómo usar tu API documentada en Swagger.

---

## 📋 Tabla de Contenidos

1. [Registrar Nuevo Usuario](#registrar-nuevo-usuario)
2. [Iniciar Sesión](#iniciar-sesión)
3. [Obtener Perfil del Usuario](#obtener-perfil-del-usuario)
4. [Listar Todos los Usuarios](#listar-todos-los-usuarios)
5. [Ejemplos con cURL](#ejemplos-con-curl)
6. [Ejemplos con JavaScript/Fetch](#ejemplos-con-javascriptfetch)
7. [Ejemplos con Postman](#ejemplos-con-postman)

---

## 🔐 Registrar Nuevo Usuario

**Endpoint**: `POST /auth/register`  
**Autenticación**: No requiere

### Request

```bash
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "password": "miPassword123",
    "nombre": "Juan",
    "apellido": "Perez",
    "rol": "ESTUDIANTE"
  }'
```

### Response (201 Created)

```json
{
  "message": "Usuario creado correctamente",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsazFhMWIyYzNkNGU1ZjYiLCJyb2wiOiJFU1RVRElBTlRFIiwiaWF0IjoxNzM4NTc5OTk5LCJleHAiOjE3Mzg2MTU5OTl9.abc123xyz..."
}
```

### Roles Disponibles

- `SUPER_ADMIN` - Administrador del sistema
- `DIRECTIVO` - Director educativo
- `DOCENTE` - Profesor
- `ESTUDIANTE` - Alumno (por defecto)

---

## 🔑 Iniciar Sesión

**Endpoint**: `POST /auth/login`  
**Autenticación**: No requiere

### Request

```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "password": "miPassword123"
  }'
```

### Response (200 OK)

```json
{
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsazFhMWIyYzNkNGU1ZjYiLCJyb2wiOiJFU1RVRElBTlRFIiwiaWF0IjoxNzM4NTc5OTk5LCJleHAiOjE3Mzg2MTU5OTl9.abc123xyz...",
  "usuario": {
    "id": "clk1a1b2c3d4e5f6",
    "email": "juan@example.com",
    "nombre": "Juan",
    "apellido": "Perez",
    "rol": "ESTUDIANTE"
  }
}
```

### Error: Credenciales Inválidas (401 Unauthorized)

```json
{
  "message": "Email o contraseña incorrectos"
}
```

---

## 👤 Obtener Perfil del Usuario

**Endpoint**: `GET /users/me`  
**Autenticación**: ✅ Requiere JWT Token

### Request

```bash
curl -X GET http://localhost:3001/users/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsazFhMWIyYzNkNGU1ZjYiLCJyb2wiOiJFU1RVRElBTlRFIiwiaWF0IjoxNzM4NTc5OTk5LCJleHAiOjE3Mzg2MTU5OTl9.abc123xyz..."
```

### Response (200 OK)

```json
{
  "id": "clk1a1b2c3d4e5f6",
  "email": "juan@example.com",
  "nombre": "Juan",
  "apellido": "Perez",
  "rol": "ESTUDIANTE"
}
```

### Error: Token No Válido (401)

```json
{
  "message": "Token no válido"
}
```

---

## 📊 Listar Todos los Usuarios

**Endpoint**: `GET /users`  
**Autenticación**: ✅ Requiere JWT Token  
**Permisos**: Solo `SUPER_ADMIN` o `DIRECTIVO`

### Request

```bash
curl -X GET http://localhost:3002/users \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsazFhMWIyYzNkNGU1ZjYiLCJyb2wiOiJTVVBFUl9BRE1JTiIsImlhdCI6MTczODU3OTk5OSwiZXhwIjoxNzM4NjE1OTk5fQ.abc123xyz..."
```

### Response (200 OK)

```json
[
  {
    "id": "clk1a1b2c3d4e5f6",
    "nombre": "Juan",
    "apellido": "Perez",
    "email": "juan@example.com",
    "rol": "ESTUDIANTE",
    "createdAt": "2026-02-03T20:00:00.000Z"
  },
  {
    "id": "clk2b2c3d4e5f6g7h",
    "nombre": "Maria",
    "apellido": "Garcia",
    "email": "maria@example.com",
    "rol": "DOCENTE",
    "createdAt": "2026-02-03T20:05:00.000Z"
  }
]
```

### Error: Acceso Denegado (403 Forbidden)

```json
{
  "message": "Acceso denegado"
}
```

---

## 💻 Ejemplos con cURL

### 1. Registrar Usuario

```bash
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "carlos@example.com",
    "password": "Pass123!",
    "nombre": "Carlos",
    "apellido": "Lopez",
    "rol": "DOCENTE"
  }' \
  -w '\nHTTP Status: %{http_code}\n'
```

### 2. Login y Guardar Token

```bash
# Obtener token
TOKEN=$(curl -s -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "carlos@example.com",
    "password": "Pass123!"
  }' | jq -r '.token')

# Usar el token
curl -X GET http://localhost:3001/users/me \
  -H "Authorization: Bearer $TOKEN"
```

### 3. Obtener Todos los Usuarios (con permisos)

```bash
curl -X GET http://localhost:3002/users \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json"
```

---

## 🌐 Ejemplos con JavaScript/Fetch

### 1. Registrar Usuario

```javascript
async function registrarUsuario() {
  try {
    const response = await fetch('http://localhost:3001/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'sofia@example.com',
        password: 'Password123',
        nombre: 'Sofia',
        apellido: 'Martinez',
        rol: 'ESTUDIANTE'
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Usuario registrado');
      console.log('Token:', data.token);
      localStorage.setItem('token', data.token);
    } else {
      console.error('❌ Error:', data.error);
    }
  } catch (error) {
    console.error('Error en la petición:', error);
  }
}
```

### 2. Iniciar Sesión

```javascript
async function login() {
  try {
    const response = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'sofia@example.com',
        password: 'Password123'
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Login exitoso');
      console.log('Usuario:', data.usuario);
      localStorage.setItem('token', data.token);
      return data.token;
    } else {
      console.error('❌ Login fallido:', data.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### 3. Obtener Perfil del Usuario

```javascript
async function obtenerMiPerfil() {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('No hay token. Debes hacer login primero');
      return;
    }

    const response = await fetch('http://localhost:3001/users/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Datos del usuario:');
      console.log(data);
    } else {
      console.error('❌ Error:', data.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### 4. Listar Todos los Usuarios

```javascript
async function listarTodosLosUsuarios() {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch('http://localhost:3002/users', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const usuarios = await response.json();
      console.log('✅ Usuarios encontrados:', usuarios.length);
      usuarios.forEach(usuario => {
        console.log(`- ${usuario.nombre} ${usuario.apellido} (${usuario.rol})`);
      });
    } else {
      console.error('❌ No tienes permisos para ver todos los usuarios');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
```

---

## 📮 Ejemplos con Postman

### Importar la Colección

1. Abre Postman
2. Click en "File" → "Import"
3. Selecciona "Link"
4. Pega: `http://localhost:3001/api-spec`
5. Click en "Continue" → "Import"

### Usar Variables de Entorno en Postman

1. Crea un environment llamado "Local API"
2. Agrega estas variables:

```
base_url: http://localhost:3001
user_service_url: http://localhost:3002
token: (vacío - se llenará automáticamente)
```

### Request: Login y Guardar Token

**Pre-request Script**:
```javascript
// Este script se ejecuta antes de la petición
// (opcional para este endpoint)
```

**Tests**:
```javascript
if (pm.response.code === 200) {
  const data = pm.response.json();
  pm.environment.set('token', data.token);
  console.log('Token guardado en variables');
}
```

---

## 🧩 Integración con Frontend

### React Example

```javascript
// services/authService.js

export const register = async (userData) => {
  try {
    const response = await fetch('http://localhost:3001/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    
    return data;
  } catch (error) {
    throw error;
  }
};

export const getProfile = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:3001/users/me', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
};
```

---

## ⚠️ Errores Comunes

### Error: CORS

```json
{
  "error": "Access to XMLHttpRequest at 'http://localhost:3001/' blocked by CORS"
}
```

**Solución**: CORS ya está configurado en `app.js`. Si sigue fallando:
- Verifica que los servidores están corriendo
- Reinicia los servidores

### Error: Token Inválido

```json
{
  "message": "Token no válido"
}
```

**Solución**:
- Obtén un nuevo token con login
- Verifica que incluyas "Bearer" antes del token
- Verifica que el token no haya expirado (8 horas)

### Error: Acceso Denegado

```json
{
  "message": "Acceso denegado"
}
```

**Solución**:
- Solo `SUPER_ADMIN` y `DIRECTIVO` pueden ver todos los usuarios
- Intenta con una cuenta que tenga esos roles

---

## 🎯 Flujo Completo de Ejemplo

```javascript
async function flujoCompleto() {
  // 1. Registrar usuario
  const registroResponse = await fetch('http://localhost:3001/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'nuevo@example.com',
      password: 'Password123',
      nombre: 'Nuevo',
      apellido: 'Usuario',
      rol: 'ESTUDIANTE'
    })
  });
  
  const registroData = await registroResponse.json();
  const token = registroData.token;
  console.log('✅ Paso 1: Usuario registrado');

  // 2. Usar el token para obtener perfil
  const perfilResponse = await fetch('http://localhost:3001/users/me', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  
  const perfil = await perfilResponse.json();
  console.log('✅ Paso 2: Perfil obtenido:', perfil);

  // 3. Intenta obtener lista de usuarios (fallará si no es admin)
  const listaResponse = await fetch('http://localhost:3002/users', {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (listaResponse.ok) {
    console.log('✅ Paso 3: Tienes acceso a la lista de usuarios');
  } else {
    console.log('⚠️ Paso 3: No tienes permisos para ver todos los usuarios');
  }
}
```

---

## 📚 Recursos

- [Swagger UI en tu navegador](http://localhost:3001/api-docs)
- [Especificación JSON](http://localhost:3001/api-spec)
- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- [Documentación de Fetch API](https://developer.mozilla.org/es/docs/Web/API/Fetch_API)

---

**¡Ahora tienes todos los ejemplos que necesitas para usar tu API! 🎉**
