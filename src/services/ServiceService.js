import ServicesRepository from "../repositories/services.repository.js"
import crypto from "crypto";

export class ServicesService{
    constructor(){
        this.repository= new ServicesRepository() 
    }
    async addService(serviceData) {
    const { name, description, duration, price, category, available } =
      serviceData;
    if (!name||!description||!duration||!price||!category||!available) {
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
}

export default ServicesService;