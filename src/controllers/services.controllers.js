import ServiceManager from "../managers/serviceManager.js";
import ServicesService from "../services/ServiceService.js";
const servicesService = new ServicesService();
const serviceManager = new ServiceManager();

export const getAllServices = async (req, res) => {
  try {
    const { category, available } = req.query;
    let services = await servicesService.getServices();

    if (category) {
      services = services.filter((service) => service.category === category);
    }

    if (available !== undefined) {
      const requestedAvailability = available === "true";
      services = services.filter(
        (service) => service.available === requestedAvailability,
      );
    }

    res.status(200).json({ status: "success", payload: services });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: `Error al obtener los servicios` });
  }
};

export const getServiceId = async (req, res) => {
  try {
    const { sid } = req.params;
    const service = await servicesService.getById(sid);

    if (!service) {
      return res
        .status(404)
        .json({ status: "error", message: "Servicio no encontrado" });
    }

    res.status(200).json({ status: "success", payload: service });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
export const createService = async (req, res) => {
  try {
    const newService = await servicesService.addService(req.body); //serviceManager.addService(req.body);
    res.status(200).json({
      status: "success",
      payload: newService,
      message: "Servicio creado con exito",
    });
  } catch (e) {
    res.status(500).json({ status: "error", message: e.message });
  }
};

export const updateServices = async (req, res) => {
  try {
    const { sid } = req.params;
    const updatedService = await serviceManager.updateService(sid, req.body);
    res.status(200).json({ status: "success", payload: updatedService });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const removeService = async (req, res) => {
  try {
    const { sid } = req.params;
    const deletedService = serviceManager.deleteService(sid);
    res.status(200).json({
      status: "success",
      message: "Servicio eliminado con exito",
      payload: deletedService,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
