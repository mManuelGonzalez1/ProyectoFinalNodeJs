import { Router } from "express";
import {
  getBookingsById,
  createBooking,
  addServiceToBooking,
} from "../controllers/bookings.controllers.js";

const router = Router();

router.get("/:bid", getBookingsById);

router.post("/", createBooking);

router.post("/:bid/services/:sid", addServiceToBooking);

export default router;
