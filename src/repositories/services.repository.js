import { ServiceDao } from "../dao/services.dao.js";

export class ServicesRepository {
  constructor() {
    this.dao = new ServiceDao();
  }
  async addService(serviceData) {
    return await this.dao.createService(serviceData);
  }
  async getAll(filter = {}, sort = {}, skip = 0, limit) {
    return await this.dao.getAll(filter, sort, skip, limit);
  }
  async getById(id) {
    return await this.dao.getById(id);
  }
  async update(id, updatedData) {
    return await this.dao.update(id, updatedData);
  }
  async delete(id) {
    return await this.dao.delete(id);
  }
}

export default ServicesRepository;
