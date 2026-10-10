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
}

export default ServicesRepository;
