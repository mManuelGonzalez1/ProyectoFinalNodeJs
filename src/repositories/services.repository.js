import { ServiceDao } from "../dao/services.dao.js";
const serviceDao = new ServiceDao();
export class ServicesRepository(){
    async addService(serviceData){
     const serviceCreated= await serviceDao.createService(serviceData);
     return serviceCreated   
    }
}

export default ServicesRepository;