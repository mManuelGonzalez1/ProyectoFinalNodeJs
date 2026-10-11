# Proyecto final Node.js

## Descripción general

Este proyecto es una API REST desarrollada en Node.js con Express para gestionar servicios y reservas. La lógica está separada por capas para mantener el código más organizado y fácil de extender.

Actualmente el proyecto incluye:

- CRUD completo de servicios.
- Filtrado de servicios por categoría y disponibilidad.
- Creación y consulta de reservas.
- Asociación de servicios a una reserva con control de cantidad.
- Persistencia local en archivos JSON dentro de `src/data/`.
- Configuración por variables de entorno.

## Estado actual del proyecto

Ya tenemos implementado lo siguiente:

- Servidor Express levantado desde `src/server.js`.
- Rutas principales en `src/routes/` para servicios y reservas.
- Controladores para manejar peticiones HTTP.
- Servicios de negocio en `src/services/`.
- Repositorios y DAOs para acceso a datos.
- Archivos JSON de persistencia en `src/data/services.json` y `src/data/bookings.json`.
- Soporte para variables de entorno usando `.env` y `.env.example`.

## Requisitos

- Node.js 18 o superior
- npm

## Instalación

1. Clona el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
cd proyectoFinalNodeJS
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea tu archivo de entorno local:

```bash
copy .env.example .env
```

En Windows o en Linux/macOS:

```bash
cp .env.example .env
```

## Variables de entorno

El proyecto usa las siguientes variables:

```env
PORT=8080
NODE_ENV=development
```

## Ejecución

Arranca el servidor desde la raíz del proyecto:

```bash
node src/server.js
```

La API queda disponible en:

```text
http://localhost:8080
```

## Estructura del proyecto

```text
proyectoFinalNodeJS/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   ├── controllers/
│   ├── dao/
│   ├── data/
│   │   ├── services.json
│   │   └── bookings.json
│   ├── repositories/
│   ├── routes/
│   └── services/
├── .env
├── .env.example
├── package.json
├── README.md
└── package-lock.json
```

## API REST

### Servicios

Base URL: `/api/services`

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/api/services` | Obtiene todos los servicios |
| GET | `/api/services/:sid` | Obtiene un servicio por ID |
| POST | `/api/services` | Crea un servicio |
| PUT | `/api/services/:sid` | Actualiza un servicio |
| DELETE | `/api/services/:sid` | Elimina un servicio |

Filtros opcionales en `GET /api/services`:

```text
GET /api/services?category=Maintenance
GET /api/services?available=true
GET /api/services?category=Maintenance&available=true
```

Ejemplo de creación de servicio (`POST /api/services`):

```json
{
  "name": "Reparación de computadora",
  "description": "Diagnóstico y reparación",
  "duration": "120 min",
  "price": 100,
  "category": "Maintenance",
  "available": true
}
```

### Reservas

Base URL: `/api/bookings`

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/api/bookings/:bid` | Obtiene una reserva por ID |
| POST | `/api/bookings` | Crea una reserva |
| POST | `/api/bookings/:bid/services/:sid` | Agrega un servicio a una reserva |

Ejemplo de creación de reserva (`POST /api/bookings`):

```json
{
  "clientName": "Ana Perez",
  "clientEmail": "ana@example.com",
  "date": "2026-10-10",
  "time": "10:00",
  "status": "pending"
}
```

Ejemplo para asociar servicio a una reserva:

```text
POST http://localhost:8080/api/bookings/ID_DE_LA_RESERVA/services/ID_DEL_SERVICIO
```

Si el servicio ya existe dentro de la reserva, su cantidad se incrementa; si no existe, se agrega con cantidad inicial `1`.

## Modelos de datos

### Servicio

```json
{
  "id": "uuid",
  "name": "Mantenimiento de bicicletas",
  "description": "Revisión preventiva",
  "duration": "150 min",
  "price": 900,
  "category": "Maintenance",
  "available": true
}
```

### Reserva

```json
{
  "id": "uuid",
  "clientName": "Manuel Gonzalez",
  "clientEmail": "manuel@example.com",
  "date": "2026-11-09",
  "time": "11:45",
  "status": "pending",
  "services": [
    { "service": "id-del-servicio", "quantity": 1 }
  ]
}
```

## Notas de implementación

- La persistencia es local, usando archivos JSON.
- El flujo actual sigue una estructura modular: rutas → controladores → servicios → repositorios → DAO.
- El manejo de errores responde con formato JSON consistente, por ejemplo:

```json
{
  "status": "error",
  "message": "Mensaje descriptivo del error"
}
```

## Próximos pasos sugeridos

- mejorar validaciones de entrada para evitar datos incompletos o inconsistentes.
- implementar tests automáticos.
- agregar documentación de ejemplo para Thunder Client o Postman.
- definir estados más completos para reservas y servicios.

## Resumen

El proyecto ya cuenta con la base funcional de una API de servicios y reservas, con rutas REST, persistencia local y una arquitectura modular lista para seguir ampliándose.
