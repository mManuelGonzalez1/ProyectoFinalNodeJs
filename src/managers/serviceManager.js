import fs from "fs/promises";
import crypto from "crypto";

class ServiceManager {
  constructor(path = "./src/data/services.json") {
    this.path = path;
  }
  async getServiceById(id) {
    const services = await this.getServices();
    const result = services.find((service) => service.id === id);
    if (result) {
      return result;
    } else {
      return "No se encontro el id del servicio buscado, por favor intenta nuevamente";
    }
  }
  async addService(serviceData) {
    const { name, description, duration, price, category, available } =
      serviceData;
    if (
      name !== undefined &&
      name !== "" &&
      description !== undefined &&
      description !== "" &&
      duration !== undefined &&
      duration !== "" &&
      price !== undefined &&
      price !== "" &&
      category !== undefined &&
      category !== "" &&
      available !== undefined &&
      available !== ""
    ) {
      throw new Error("Por favor completa todos los campos");
    }
    const services = await this.getServices();
    const newService = {
      id: crypto.randomUUID(),
      name,
      description,
      duration,
      price,
      category,
      available,
    };
    services.push(newService);
    await fs.writeFile(this.path, JSON.stringify(services, null, 2), "utf-8");
    return newService;
  }
  async updateService(id, updatedData) {
    const services = await this.getServices();
    const posicion = services.findIndex((value) => value.id == id);
    if (posicion === -1) {
      throw new Error(
        "No encontramos el servicio, no podemos actualizarlo, por favor intenta de nuevo",
      );
    }
    if (updatedData.id !== service.id && updatedData.id !== undefined) {
      throw new Error("El id no se puede cambiar");
    }
    services = {
      ...services,
      ...updatedData,
    };
    await fs.writeFile(this.path, JSON.stringify(services, null, 2), "utf-8");
    return services;
  }
  deleteServiceById(id) {
    const posicion = this.services.findIndex((value) => value.id == id);
    console.log(posicion);
    if (posicion != -1) {
      this.services.splice(posicion, 1);
      return this.services;
    } else {
      return "No se encontro el id solicitdo, por favor intentalo nuevamente";
    }
  }
  async getServices() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }
}

const obj = new ServiceManager();
const find = new ServiceManager();
const update = new ServiceManager();
const deleted = new ServiceManager();
const create = new ServiceManager();
console.log(obj.getServices());
console.log(find.getServiceById(2));
console.log(update.updateService(1, { name: "Servicio de limpieza" }));
console.log(deleted.deleteServiceById(2));
console.log(
  create.createService(
    "Mantenimiento de bicicletas",
    "Revision preventiva",
    "150 min",
    900,
    "maintenace",
    true,
  ),
);
