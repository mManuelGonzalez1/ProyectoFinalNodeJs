import ServicesService from "../services/ServiceService.js";
const servicesService = new ServicesService();

export const getAllServices = async (req, res) => {
  try {
    const { services, pagination } = await servicesService.getServices(
      req.validated.query,
    );
    res.status(200).json({ status: "success", payload: services, pagination });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
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
    const statusCode =
      error.name === "CastError" ? 400 : error.statusCode || 500;
    res.status(statusCode).json({ status: "error", message: error.message });
  }
};
export const createService = async (req, res) => {
  try {
    const newService = await servicesService.addService(req.validated.body);
    res.status(201).json({
      status: "success",
      payload: newService,
      message: "Servicio creado con exito",
    });
  } catch (e) {
    const statusCode =
      e.statusCode ||
      (e.name === "ValidationError" || e.name === "CastError" ? 400 : 500);
    res.status(statusCode).json({ status: "error", message: e.message });
  }
};

export const updateServices = async (req, res) => {
  try {
    const { sid } = req.params;
    const updatedService = await servicesService.updateService(
      sid,
      req.validated.body,
    );
    res.status(200).json({ status: "success", payload: updatedService });
  } catch (error) {
    const statusCode =
      error.statusCode ||
      (error.name === "CastError" || error.name === "ValidationError"
        ? 400
        : 500);
    res.status(statusCode).json({ status: "error", message: error.message });
  }
};

export const removeService = async (req, res) => {
  try {
    const { sid } = req.params;
    const deletedService = await servicesService.deleteService(sid);
    res.status(200).json({
      status: "success",
      message: "Servicio eliminado con exito",
      payload: deletedService,
    });
  } catch (error) {
    const statusCode =
      error.statusCode || (error.name === "CastError" ? 400 : 500);
    res.status(statusCode).json({ status: "error", message: error.message });
  }
};
