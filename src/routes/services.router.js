import { Router } from "express";
import {
  getAllServices,
  getServiceId,
  createService,
  updateServices,
  removeService,
} from "../controllers/services.controllers.js";
import { validateRequest } from "../middlewares/validation.middleware.js";
import {
  createServiceSchema,
  servicesQuerySchema,
  updateServiceSchema,
} from "../schemas/service.schema.js";

const router = Router();

router.get(
  "/",
  validateRequest({ query: servicesQuerySchema }),
  getAllServices,
);

router.get("/:sid", getServiceId);

router.post(
  "/",
  validateRequest({ body: createServiceSchema }),
  createService,
);

router.put(
  "/:sid",
  validateRequest({ body: updateServiceSchema }),
  updateServices,
);

router.delete("/:sid", removeService);

export default router;
