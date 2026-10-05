import { Router } from "express";
import {
  getAllServices,
  getServiceId,
  createService,
  updateServices,
  removeService,
} from "../controllers/services.controllers.js";

const router = Router();

router.get("/", getAllServices);

router.get("/:sid", getServiceId);

router.post("/", createService);

router.put("/:sid", updateServices);

router.delete("/:sid", removeService);

export default router;
