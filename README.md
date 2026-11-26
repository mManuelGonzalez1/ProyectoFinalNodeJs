# Proyecto final Node.js

## Descripción general

Aplicación Node.js con Express para administrar servicios y reservas. Incluye una API REST, páginas renderizadas con Handlebars y actualizaciones en tiempo real del catálogo de servicios mediante Socket.IO.

Los datos se guardan en MongoDB mediante Mongoose. El código está organizado en rutas, controladores, servicios, repositorios y DAOs.

## Estado actual del proyecto

- CRUD y filtros de servicios.
- Creación y consulta de reservas, y asociación de servicios con control de cantidad.
- Vistas Handlebars para el catálogo, el detalle de un servicio y el flujo de reserva.
- Socket.IO para sincronizar en vivo el catálogo de servicios.
- Configuración mediante `.env`.

## Requisitos

- Node.js 20.19.0 o superior
- npm
- MongoDB (la actualización en vivo requiere una instancia que soporte change streams, como MongoDB Atlas o un replica set)

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
MONGO_URI=mongodb+srv://USUARIO:CONTRASENA@cluster0.example.mongodb.net/nombre_base
```

Reemplaza `MONGO_URI` por la URI de tu instancia. El valor de `.env.example` es solo un ejemplo.

## Ejecución

Arranca el servidor desde la raíz del proyecto:

```bash
node src/server.js
```

La API queda disponible en:

```text
http://localhost:8080
```

Al iniciar, el servidor conecta a MongoDB antes de aceptar peticiones.

## Estructura del proyecto

```text
proyectoFinalNodeJS/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/       # MongoDB, entorno y Handlebars
│   ├── controllers/  # Controladores API y vistas
│   ├── dao/
│   │   └── models/  # Esquemas Mongoose
│   ├── public/       # CSS y recursos estáticos
│   ├── repositories/
│   ├── routes/
│   ├── services/     # Lógica de negocio
│   └── views/        # Plantillas Handlebars
├── .env
├── .env.example
├── package.json
├── README.md
└── package-lock.json
```

## API REST

### Servicios

Base URL: `/api/services`

| Método | Ruta                 | Descripción                 |
| ------ | -------------------- | --------------------------- |
| GET    | `/api/services`      | Obtiene todos los servicios |
| GET    | `/api/services/:sid` | Obtiene un servicio por ID  |
| POST   | `/api/services`      | Crea un servicio            |
| PUT    | `/api/services/:sid` | Actualiza un servicio       |
| DELETE | `/api/services/:sid` | Elimina un servicio         |

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
  "duration": 120,
  "price": 100,
  "category": "Maintenance",
  "available": true
}
```

### Reservas

Base URL: `/api/bookings`

| Método | Ruta                               | Descripción                      |
| ------ | ---------------------------------- | -------------------------------- |
| GET    | `/api/bookings/:bid`               | Obtiene una reserva por ID       |
| POST   | `/api/bookings`                    | Crea una reserva                 |
| POST   | `/api/bookings/:bid/services/:sid` | Agrega un servicio a una reserva |

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

El estado es opcional en la API; si no se envía, se usa `pending`. Esta ruta crea la reserva sin servicios asociados.

Ejemplo para asociar servicio a una reserva:

```text
POST http://localhost:8080/api/bookings/ID_DE_LA_RESERVA/services/ID_DEL_SERVICIO
```

El servicio debe existir. Si ya está asociado a la reserva, su cantidad se incrementa; si no, se agrega con cantidad inicial `1`.

### Códigos de respuesta

- `200`: consulta, actualización o asociación exitosa.
- `201`: creación exitosa.
- `400`: datos inválidos o ID con formato incorrecto.
- `404`: servicio o reserva inexistente.
- `500`: error inesperado del servidor o de la base de datos.

## Modelos de datos

### Servicio

```json
{
  "_id": "<ObjectId>",
  "name": "Mantenimiento de bicicletas",
  "description": "Revisión preventiva",
  "duration": 150,
  "price": 900,
  "category": "Maintenance",
  "available": true
}
```

### Reserva

```json
{
  "_id": "<ObjectId>",
  "clientName": "Manuel Gonzalez",
  "clientEmail": "manuel@example.com",
  "date": "2026-11-09",
  "time": "11:45",
  "status": "pending",
  "services": [{ "service": "<ObjectId-del-servicio>", "quantity": 1 }]
}
```

## Notas de implementación

- La persistencia usa MongoDB y Mongoose; los IDs son ObjectId.
- El flujo actual sigue una estructura modular: rutas → controladores → servicios → repositorios → DAO.
- El manejo de errores responde con formato JSON consistente, por ejemplo:

```json
{
  "status": "error",
  "message": "Mensaje descriptivo del error"
}
```

## Vistas y actualizaciones en tiempo real

- `GET /services` muestra el catálogo; cada servicio enlaza a su detalle en `/services/:id`.
- `GET /bookings` muestra un formulario con nombre, correo, fecha, hora, estado e ID del servicio.
- `POST /bookings` valida que el servicio exista, crea la reserva y muestra la confirmación con los datos ingresados. El servicio se asocia con cantidad `1`.
- `GET /bookings/:bid` muestra una reserva existente.
- Socket.IO solo actualiza el catálogo de servicios. Al conectarse, el cliente recibe `services__updated`; los cambios en MongoDB vuelven a emitir la lista. Los errores se informan con `services__error`.
- Los change streams requieren MongoDB en modo replica set; sin ese soporte, la aplicación puede servir las páginas y API, pero no recibirá cambios en vivo.

## Pruebas

No hay una suite de pruebas automatizadas configurada actualmente. El script `npm test` de `package.json` sigue siendo un placeholder.

## Resumen

El proyecto cuenta con API REST de servicios y reservas, vistas Handlebars y actualizaciones en vivo con Socket.Io para servicios, con persistencia en MongoDB.
