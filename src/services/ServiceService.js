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
  async getServices(query) {
    if (query === undefined) {
      const { services } = await this.repository.getAll();
      return services;
    }

    const { category, available, page = 1, limit = 10, sort } = query;
    const filter = {};
    if (category) {
      filter.category = category;
    }
    if (available !== undefined) {
      filter.available = available;
    }

    const skip = (page - 1) * limit;
    let sortOption = {};
    if (sort === "asc") {
      sortOption = { price: 1 };
    }
    if (sort === "desc") {
      sortOption = { price: -1 };
    }

    const { services, total } = await this.repository.getAll(
      filter,
      sortOption,
      skip,
      limit,
    );
    const totalPages = Math.ceil(total / limit);

    return {
      services,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1 && total > 0,
      },
    };
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
