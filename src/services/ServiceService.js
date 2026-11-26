import ServicesRepository from "../repositories/services.repository.js";

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
      duration === undefined ||
      duration === null ||
      price === undefined ||
      price === null ||
      !category ||
      available === undefined ||
      available === null
    ) {
      const error = new Error("Por favor completa todos los campos");
      error.statusCode = 400;
      throw error;
    }
    const newService = {
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
    return this.repository.getAll();
  }
  async getById(id) {
    return this.repository.getById(id);
  }

  async updateService(id, updatedData) {
    const service = await this.repository.getById(id);
    if (!service) {
      const error = new Error(
        "No encontramos el servicio, no podemos actualizarlo, por favor intenta de nuevo",
      );
      error.statusCode = 404;
      throw error;
    }

    if (
      updatedData.id !== undefined &&
      String(updatedData.id) !== String(service._id)
    ) {
      const error = new Error("El id no se puede cambiar");
      error.statusCode = 400;
      throw error;
    }

    const serviceUpdates = { ...updatedData };
    delete serviceUpdates.id;
    delete serviceUpdates._id;
    return await this.repository.update(id, serviceUpdates);
  }
  async deleteService(id) {
    const deletedService = await this.repository.delete(id);
    if (!deletedService) {
      const error = new Error(
        "No se encontro el id solicitado, por favor intentalo nuevamente",
      );
      error.statusCode = 404;
      throw error;
    }

    return deletedService;
  }
}

export default ServicesService;
