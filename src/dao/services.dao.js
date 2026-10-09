import fs from "fs/promises";
import crypto from "crypto";

const PATH = "./data/services.json";

export class ServiceDao {
  async #readFile() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (e) {
      return [];
    }
  }

  async #writeFile(data) {
    await fs.writeFile(this.path, JSON.stringify(data, null, 2));
  }
  async addService(serviceData) {
    const services = await this.#readFile();
    const newService = {
      id: crypto.randomUUID(),
      ...serviceData,
    };
    services.push(newService);
    await fs.writeFile(this.path, JSON.stringify(services, null, 2), "utf-8");
    return newService;
  }
  async getServiceById(id) {
    const services = await this.#readFile();
    return (
      services.find((service) => String(service.id) === String(id)) ?? null
    );
  }
  async getAll() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }
  async updateService(id, updatedData) {
    const services = await this.#readFile();
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
    const services = await this.#readFile();
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
}
