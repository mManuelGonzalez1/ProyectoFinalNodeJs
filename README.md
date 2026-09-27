# Proyecto Final Node.js

## Descripcion

Aplicacion de Node.js para administrar servicios mediante la clase `ServiceManager`. Los servicios se almacenan de forma persistente en el archivo `src/data/services.json`.

El proyecto permite consultar, agregar, actualizar y eliminar servicios.

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

## Variables de entorno

El archivo `src/config/env.config.js` requiere las siguientes variables:

```env
PORT=3000
NODE_ENV=development
```

Crea un archivo `.env` en la raiz del proyecto con esos valores. `dotenv` se encarga de cargarlos automaticamente.

> Actualmente `src/app.js` no importa `env.config.js`. Las variables son necesarias cuando se utilice ese modulo de configuracion.

## Ejecucion

Desde la raiz del proyecto ejecuta:

```bash
node src/app.js
```

El archivo `src/app.js` ejecuta un ejemplo que consulta, agrega, busca, actualiza y elimina un servicio.

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

Si no encuentra el servicio, devuelve un mensaje indicando que el ID no existe.

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
  config/
    env.config.js
  data/
    services.json
  managers/
    serviceManager.js
package.json
README.md
```
