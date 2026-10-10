import ServiceDao from "../dao/services.dao.js";
const serviceDao = new ServiceDao();

export addService(serviceData) {
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
    const services = ServiceDao.createService(serviceData); 
    return services;
  }