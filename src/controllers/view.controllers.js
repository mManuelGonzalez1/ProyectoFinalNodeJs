import ServicesService from "../services/ServiceService.js";
const servicesService = new ServicesService();

export const getAllServices = async (req, res) => {
  try {
    const services = await servicesService.getServices();
    res.status(200).render("services", { title: "Servicios", services });
  } catch (error) {
    console.error("Error al obtener los servicios para la vista:", error);
    res
      .status(500)
      .json({ status: "error", message: `Error al obtener los servicios` });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await servicesService.getById(id);
    if (!service) {
      return res.status(404).render("service", {
        title: "Servicio no encontrado",
      });
    }

    return res.status(200).render("service", { title: "Servicio", service });
  } catch (error) {
    console.error("Error al obtener el servicio para la vista:", error);
    const isInvalidId = error.name === "CastError";
    return res.status(isInvalidId ? 404 : 500).render("service", {
      title: isInvalidId ? "Servicio no encontrado" : "Error al cargar el servicio",
      message: isInvalidId
        ? undefined
        : "No fue posible consultar el servicio.",
    });
  }
};
