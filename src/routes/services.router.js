import { Router } from "express";
import ServiceManager from "../managers/serviceManager.js";

const router = Router();
const serviceManager = new ServiceManager("./src/data/services.json");

router.get("/", async (req, res) => {
  try {
    const { category, available } = req.query;
    let services = await serviceManager.getServices();

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
    res.status(500).json({ status: "error", message: error.message });
  }
});

router.get("/:sid", async (req, res) => {
  try {
    const { sid } = req.params;
    const service = await serviceManager.getServiceById(sid);

    if (!service) {
      return res
        .status(404)
        .json({ status: "error", message: "Servicio no encontrado" });
    }

    res.status(200).json({ status: "success", payload: service });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});
export default router;
