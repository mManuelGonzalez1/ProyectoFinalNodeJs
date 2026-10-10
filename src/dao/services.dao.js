import fs from "fs/promises";

const PATH = "../proyectoFinalNodeJS/src/data/services.json";

export class ServiceDao {
  async #readFile() {
    try {
      const data = await fs.readFile(PATH, "utf-8");
      return JSON.parse(data);
    } catch (e) {
      return [];
    }
  }

  async #writeFile(data) {
    await fs.writeFile(PATH, JSON.stringify(data, null, 2));
  }
  async createService(serviceData) {
    const services = await this.#readFile();
    const newService = {
      ...serviceData,
    };
    services.push(newService);
    await this.#writeFile(services);
    return newService;
  }
  async getById(id) {
    const services = await this.#readFile();
    return (
      services.find((service) => String(service.id) === String(id)) ?? null
    );
  }
  async getAll() {
    return this.#readFile();
  }
  async update(id, updatedData) {
    const services = await this.#readFile();
    const posicion = services.findIndex((value) => value.id == id);
    if (posicion === -1) {
      throw new Error(
        "No encontramos el servicio, no podemos actualizarlo, por favor intenta de nuevo",
      );
    }
    const updatedService = {
      ...services[posicion],
      ...updatedData,
      id,
    };
    services[posicion] = updatedService;
    await this.#writeFile(services);
    return updatedService;
  }
  async delete(id) {
    const services = await this.#readFile();
    const posicion = services.findIndex((value) => value.id == id);
    console.log(posicion);
    if (posicion != -1) {
      services.splice(posicion, 1);
      await this.#writeFile(services);
      return services;
    } else {
      throw new Error(
        "No se encontro el id solicitdo, por favor intentalo nuevamente",
      );
    }
  }
}
export default ServiceDao;
