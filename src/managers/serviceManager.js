import fs from "fs/promises";
import crypto from "crypto";

export class ServiceManager {
  constructor(path = "./src/data/services.json") {
    this.path = path;
  }
  async getServiceById(id) {
    const services = await this.getServices();
    return (
      services.find((service) => String(service.id) === String(id)) ?? null
    );
  }
  async addService(serviceData) {
    const { name, description, duration, price, category, available } =
      serviceData;
    if (
      name === undefined ||
      name === "" ||
      description === undefined ||
      description === "" ||
      duration === undefined ||
      duration === "" ||
      price === undefined ||
      price === "" ||
      category === undefined ||
      category === "" ||
      available === undefined ||
      available === ""
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
    if (
      updatedData.id !== services[posicion].id &&
      updatedData.id !== undefined
    ) {
      throw new Error("El id no se puede cambiar");
    }
    const updatedService = {
      ...services[posicion],
      ...updatedData,
      id,
    };
    services[posicion] = updatedService;
    await fs.writeFile(this.path, JSON.stringify(services, null, 2), "utf-8");
    return updatedService;
  }
  async deleteService(id) {
    const services = await this.getServices();
    const posicion = services.findIndex((value) => value.id == id);
    console.log(posicion);
    if (posicion != -1) {
      services.splice(posicion, 1);
      await fs.writeFile(this.path, JSON.stringify(services, null, 2), "utf-8");
      return services;
    } else {
      throw new Error(
        "No se encontro el id solicitdo, por favor intentalo nuevamente",
      );
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
export default ServiceManager;
