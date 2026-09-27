import ServiceManager from "./managers/serviceManager.js";
const manager = new ServiceManager("./src/data/services.json");

async function main(params) {
  try {
    console.log("==== 1. Consultando servicios iniciales ====");
    const initialServices = await manager.getServices();
    console.log("Servicios actuales", initialServices);
    console.log("==== 2. Agregando un nuevo servicio ====");
    const createServices = await manager.addService({
      name: "Mantenimiento de bicicletas",
      description: "Revision preventiva",
      duration: "150 min",
      price: 900,
      category: "maintenace",
      available: true,
    });
    console.log("Servicio Añadido", createServices);
    console.log("==== 3. Buscando servicio por ID ====");
    const idServices = await manager.getServiceById(1);
    console.log("Servicios encontrado", idServices);

    console.log("==== 4. Actualizando servicios ====");
    const updatedServices = await manager.updateService(createServices.id, {
      price: 1390,
      category: "review",
    });
    console.log("Servicios actualizados", updatedServices);
    console.log("==== 5. Eliminado servicio ====");
    const deletedServices = await manager.deleteService(createServices.id);
    console.log("Servicio eliminado", deletedServices);
  } catch (error) {
    console.log(error);
  }
}

main();
