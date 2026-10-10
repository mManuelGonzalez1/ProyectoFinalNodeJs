import { ServiceDao } from "../dao/services.dao.js";

export class ServicesRepository {
    constructor() {
    this.dao = new ServiceDao();
  }
    async addService(serviceData){
     return await this.dao.createService(serviceData);   
    }
}

export default ServicesRepository;