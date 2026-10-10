import { ServiceDao } from "../dao/services.dao.js";
export class ServicesRepository {
    constructor() {
    this.dao = new ServiceDao();
  }
    async addService(serviceData){
     const serviceCreated= await serviceDao.createService(serviceData);
     return serviceCreated   
    }
}

export default ServicesRepository;