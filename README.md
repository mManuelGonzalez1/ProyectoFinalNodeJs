# Proyecto Final Node.js

## Descripcion

API REST de Node.js y Express para administrar servicios y reservas. Los datos se almacenan de forma persistente en archivos JSON dentro de `src/data/`.

El proyecto permite consultar, crear, actualizar y eliminar servicios, además de crear reservas, consultarlas por ID y asociarles servicios.

## Requisitos

- Node.js 18 o superior.
- npm.

## Instalacion

1. Clona el repositorio y entra en la carpeta del proyecto:

```bash
git clone <URL_DEL_REPOSITORIO>
cd proyectoFinalNodeJS
```

2. Instala las dependencias:

```bash
npm install
```

## Ejecucion

Desde la raiz del proyecto inicia el servidor:

```bash
node src/server.js
```

El servidor queda disponible en `http://localhost:8080`. Puedes cambiar el puerto definiendo la variable de entorno `PORT`. Mantén la terminal abierta mientras utilizas la API.

## API de servicios

Todas las rutas comienzan con `/api/services`.

| Metodo   | Ruta                 | Descripcion                      |
| -------- | -------------------- | -------------------------------- |
| `GET`    | `/api/services`      | Obtiene todos los servicios.     |
| `GET`    | `/api/services/:sid` | Obtiene un servicio por ID.      |
| `POST`   | `/api/services`      | Crea un servicio.                |
| `PUT`    | `/api/services/:sid` | Actualiza un servicio existente. |
| `DELETE` | `/api/services/:sid` | Elimina un servicio.             |

La consulta de todos los servicios acepta los filtros opcionales `category` y `available`:

```text
GET /api/services?category=Maintenance
GET /api/services?available=true
GET /api/services?category=Maintenance&available=true
```

Los valores de `category` deben coincidir exactamente con la categoria guardada. Para `available`, utiliza `true` o `false`.

### Probar con Thunder Client

1. Inicia el servidor con `node src/server.js`.
2. En VS Code, abre Thunder Client y selecciona **New Request**.
3. Elige el metodo HTTP, ingresa la URL completa y pulsa **Send**.
4. Para `POST` y `PUT`, abre **Body**, selecciona **JSON** y envia el objeto correspondiente.

Ejemplos de URL:

```text
GET    http://localhost:8080/api/services
GET    http://localhost:8080/api/services/1
GET    http://localhost:8080/api/services?category=Maintenance
```

Ejemplo de body JSON para crear un servicio (`POST /api/services`):

```json
{
  "name": "Reparacion de computadora",
  "description": "Diagnostico y reparacion",
  "duration": "120 min",
  "price": 100,
  "category": "Maintenance",
  "available": true
}
```

Al crear un servicio, la API genera el `id` automaticamente. Usa el ID devuelto para probar `GET`, `PUT` o `DELETE` sobre ese servicio. `PUT` acepta un objeto JSON con los campos a actualizar; no se puede cambiar el ID.

Las respuestas exitosas tienen el estado `200` y un objeto JSON con `status: "success"` y `payload`. Si no se encuentra un servicio por ID, la API responde con `404`.

## API de reservas

Todas las rutas de reservas comienzan con `/api/bookings`.

| Metodo | Ruta | Descripcion |
| ------ | ---- | ----------- |
| `GET` | `/api/bookings/:bid` | Obtiene una reserva por ID. |
| `POST` | `/api/bookings` | Crea una reserva. |
| `POST` | `/api/bookings/:sid/services/:bid` | Agrega un servicio a una reserva. |

Para crear una reserva, envia un objeto JSON con estos campos:

```json
{
  "clientName": "Ana Perez",
  "clientEmail": "ana@example.com",
  "date": "2026-10-10",
  "time": "10:00",
  "status": "pending"
}
```

`status` es opcional en la peticion y toma el valor `pending` si se omite. El ID de la reserva lo genera la API como UUID.

Para asociar un servicio, usa el ID del servicio en `:sid` y el ID de la reserva en `:bid`, en ese orden. Por ejemplo:

```text
POST http://localhost:8080/api/bookings/ID_DEL_SERVICIO/services/ID_DE_LA_RESERVA
```

El servicio asociado se guarda en la reserva con una cantidad inicial de `1`. Si se agrega de nuevo, aumenta su cantidad.

## Recurso `bookings`

Las reservas se guardan en `src/data/bookings.json` como un arreglo de objetos. Cada reserva contiene:

| Campo | Tipo | Descripcion |
| ----- | ---- | ----------- |
| `id` | `string` | Identificador UUID generado al crear la reserva. |
| `clientName` | `string` | Nombre del cliente. Es obligatorio. |
| `clientEmail` | `string` | Correo del cliente. Es obligatorio. |
| `date` | `string` | Fecha de la reserva. Es obligatoria. |
| `time` | `string` | Hora de la reserva. Es obligatoria. |
| `status` | `string` | Estado de la reserva; por defecto es `pending`. |
| `services` | `array` | Servicios asociados, cada uno con `service` (ID) y `quantity`. |

## Recurso `services`

## Recurso `services`

Los datos se guardan en `src/data/services.json` como un arreglo de objetos.

Cada servicio tiene la siguiente estructura:

| Campo         | Tipo                | Descripcion                                                             |
| ------------- | ------------------- | ----------------------------------------------------------------------- |
| `id`          | `number` o `string` | Identificador unico del servicio. Los nuevos servicios reciben un UUID. |
| `name`        | `string`            | Nombre del servicio. Es obligatorio.                                    |
| `description` | `string`            | Descripcion del servicio. Es obligatoria.                               |
| `duration`    | `string`            | Duracion estimada, por ejemplo `150 min`. Es obligatoria.               |
| `price`       | `number`            | Precio del servicio. Es obligatorio.                                    |
| `category`    | `string`            | Categoria del servicio. Es obligatoria.                                 |
| `available`   | `boolean`           | Indica si el servicio esta disponible. Es obligatorio.                  |

Ejemplo de un servicio:

```json
{
  "id": 1,
  "name": "Mantenimiento de computadoras",
  "description": "Revision preventiva de computadoras",
  "duration": "150 min",
  "price": 90,
  "category": "Maintenance",
  "available": true
}
```

## Uso de `ServiceManager`

Importa la clase y crea una instancia. El constructor recibe opcionalmente la ruta del archivo JSON:

```javascript
import ServiceManager from "./src/managers/serviceManager.js";

const manager = new ServiceManager("./src/data/services.json");
```

Todos los metodos son asincronos, por lo que deben utilizarse con `await` dentro de una funcion `async`.

### `getServices()`

Obtiene todos los servicios almacenados:

```javascript
const services = await manager.getServices();
console.log(services);
```

Si el archivo no existe o contiene un JSON invalido, el metodo devuelve un arreglo vacio.

### `getServiceById(id)`

Busca un servicio por su identificador:

```javascript
const service = await manager.getServiceById(1);
console.log(service);
```

Si no encuentra el servicio, devuelve `null`.

### `addService(serviceData)`

Agrega un servicio nuevo. Todos los campos son obligatorios y no pueden ser `undefined` ni cadenas vacias:

```javascript
const newService = await manager.addService({
  name: "Mantenimiento de bicicletas",
  description: "Revision preventiva",
  duration: "150 min",
  price: 900,
  category: "Maintenance",
  available: true,
});

console.log(newService);
```

El método genera automaticamente un identificador UUID, guarda el servicio en `services.json` y devuelve el servicio creado.

### `updateService(id, updatedData)`

Actualiza los campos de un servicio existente:

```javascript
const updatedService = await manager.updateService(newService.id, {
  price: 950,
  category: "Repair",
});

console.log(updatedService);
```

No se permite cambiar el identificador del servicio. Si el ID no existe, el metodo lanza un error.

### `deleteService(id)`

Elimina un servicio por su ID:

```javascript
const remainingServices = await manager.deleteService(newService.id);
console.log(remainingServices);
```

El metodo devuelve el arreglo de servicios restante. Si el ID no existe, lanza un error.

## Ejemplo completo

```javascript
import ServiceManager from "./src/managers/serviceManager.js";

const manager = new ServiceManager();

async function main() {
  const services = await manager.getServices();
  console.log("Servicios actuales:", services);

  const created = await manager.addService({
    name: "Mantenimiento de bicicletas",
    description: "Revision preventiva",
    duration: "150 min",
    price: 900,
    category: "Maintenance",
    available: true,
  });

  const found = await manager.getServiceById(created.id);
  console.log("Servicio encontrado:", found);

  const updated = await manager.updateService(created.id, {
    price: 950,
  });
  console.log("Servicio actualizado:", updated);

  await manager.deleteService(created.id);
  console.log("Servicio eliminado");
}

main().catch((error) => {
  console.error("Ocurrio un error:", error.message);
});
```

## Estructura principal

```text
src/
  app.js
  server.js
  config/
    env.config.js
  data/
    bookings.json
    services.json
  managers/
    bookingManager.js
    serviceManager.js
  routes/
    bookings.router.js
    services.router.js
package.json
README.md
```
