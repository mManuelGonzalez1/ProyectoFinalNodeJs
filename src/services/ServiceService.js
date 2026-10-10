import ServicesRepository from "../repositories/services.repository.js";
import crypto from "crypto";

export class ServicesService {
  constructor() {
    this.repository = new ServicesRepository();
  }
  async addService(serviceData) {
    const { name, description, duration, price, category, available } =
      serviceData;
    if (
      !name ||
      !description ||
      !duration ||
      !price ||
      !category ||
      !available
    ) {
      throw new Error("Por favor completa todos los campos");
    }
    const newService = {
      id: crypto.randomUUID(),
      name,
      description,
      duration,
      price,
      category,
      available,
    };
    return await this.repository.addService(newService);
  }
  async getServices() {
    try {
      return this.repository.getAll();
    } catch (error) {
      return error.message;
    }
  }
  async getById(id) {
    try {
      return this.repository.getById(id);
    } catch (error) {
      return error.message;
    }
  }

  async updateService(id, updatedData) {
    try {
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
      return this.repository.update(updatedService);
    } catch (error) {
      return error.message;
    }
  }
  async deleteService(id) {
    try {
      const services = await this.getServices();
      const posicion = services.findIndex((value) => value.id == id);
      if (posicion != -1) {
        services.splice(posicion, 1);
        return this.repository.delete(services);
      } else {
        throw new Error(
          "No se encontro el id solicitado, por favor intentalo nuevamente",
        );
      }
    } catch (error) {}
  }
}

export default ServicesService;
