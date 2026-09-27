import crypto from "crypto";

class ServiceManager {
  constructor() {
    this.services = [
      {
        id: 1,
        name: "Mantenimiento de computadoras",
        description: "Revision preventiva de computadoras",
        duration: "150 min",
        price: 90,
        category: "Maintenance",
        available: true,
      },
      {
        id: 2,
        name: "Mantenimiento de aviones",
        description: "Revision preventiva de motores",
        duration: "400 min",
        price: 390,
        category: "Maintenance",
        available: true,
      },
    ];
  }
  getServiceById(id) {
    const result = this.services.find((service) => service.id === id);
    if (result) {
      return result;
    } else {
      return "No se encontro el id del servicio buscado, por favor intenta nuevamente";
    }
  }
  createService(name, description, duration, price, category, available) {
    const newService = {
      id: crypto.randomUUID(),
      name,
      description,
      duration,
      price,
      category,
      available,
    };
    if (
      name !== undefined &&
      name !== "" &&
      description !== undefined &&
      description !== "" &&
      duration !== undefined &&
      duration !== "" &&
      price !== undefined &&
      price !== "" &&
      category !== undefined &&
      category !== "" &&
      available !== undefined &&
      available !== ""
    ) {
      this.services.push(newService);
      return this.services;
    } else {
      return "Por favor digita los campos completos";
    }
  }
  updateService(id, updatedData) {
    let service = this.getServiceById(id);
    if (!service)
      return "No encontramos el servicio, no podemos actualizarlo, por favor intenta de nuevo";
    if (updatedData.id !== service.id && updatedData.id !== undefined) {
      return "No podemos actualizar el id";
    }
    service = {
      ...service,
      ...updatedData,
    };
    return service;
  }
  deleteServiceById(id) {
    const posicion = this.services.findIndex((value) => value.id == id);
    console.log(posicion);
    if (posicion != -1) {
      this.services.splice(posicion, 1);
      return this.services;
    } else {
      return "No se encontro el id solicitdo, por favor intentalo nuevamente";
    }
  }
  getServices() {
    return this.services;
  }
}

const obj = new ServiceManager();
const find = new ServiceManager();
const update = new ServiceManager();
const deleted = new ServiceManager();
const create = new ServiceManager();
console.log(obj.getServices());
console.log(find.getServiceById(2));
console.log(update.updateService(1, { name: "Servicio de limpieza" }));
console.log(deleted.deleteServiceById(2));
console.log(
  create.createService(
    "Mantenimiento de bicicletas",
    "Revision preventiva",
    "150 min",
    900,
    "maintenace",
    true,
  ),
);
