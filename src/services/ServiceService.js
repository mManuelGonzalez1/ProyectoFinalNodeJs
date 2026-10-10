import ServiceDao from "../dao/services.dao.js";
import crypto from "crypto";
const serviceDao = new ServiceDao();

export  async function addService(serviceData) {
    const { name, description, duration, price, category, available } =
      serviceData;
    if (
      name === undefined ||
      name === "" ||
      description === undefined ||
      description === "" ||
      duration === undefined ||
      duration === "" ||
      price === undefined ||
      price === "" ||
      category === undefined ||
      category === "" ||
      available === undefined ||
      available === ""
    ) {
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
    const services = await serviceDao.createService(newService); 
    return services;
  }