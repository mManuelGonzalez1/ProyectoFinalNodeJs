import { ServiceDao } from "../dao/services.dao.js";

export class ServicesRepository {
  constructor() {
    this.dao = new ServiceDao();
  }
  async addService(serviceData) {
    return await this.dao.createService(serviceData);
  }
  async getAll() {
    return await this.dao.getAll();
  }
  async getById(id) {
    return await this.dao.getById(id);
  }
  async update(updatedData) {
    return await this.dao.update(updatedData);
  }
  async delete(id) {
    return await this.dao.delete(id);
  }
}

export default ServicesRepository;
