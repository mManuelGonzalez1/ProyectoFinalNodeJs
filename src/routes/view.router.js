import { Router } from "express";
import {
  getAllServices,
  getServiceById,
} from "../controllers/view.controllers.js";
import {
  createBookingView,
  renderBookingById,
  renderBookingForm,
} from "../controllers/bookings.view.controllers.js";

const router = Router();

router.get("/bookings", renderBookingForm);
router.post("/bookings", createBookingView);
router.get("/bookings/:bid", renderBookingById);
router.get("/services", getAllServices);
router.get("/services/:id", getServiceById);

export default router;
