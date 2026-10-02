import { Router } from "express";
import BookingManager from "../managers/bookingManager.js";
import ServiceManager from "../managers/serviceManager.js";

const router = Router();
const bookingManager = new BookingManager("./src/data/bookings.json");
const serviceManager = new ServiceManager("./src/data/services.json");

router.get("/:bid", async (req, res) => {
  try {
    const { bid } = req.params;
    const bookings = await bookingManager.getBookingsById(bid);

    if (!bookings) {
      return res
        .status(400)
        .json({ status: "error", message: "Servicio Agendado no encontrado" });
    }
    res.status(200).json({ status: "success", payload: bookings });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { clientName, clientEmail, date, time, status } = req.body;
    if (!clientName || !clientEmail || !date || !time) {
      return res.status(400).json({
        status: "error",
        message: "Faltan datos, por favor ingresalos para mostrar la info",
      });
    }

    const newBooking = await bookingManager.createBooking({
      clientName,
      clientEmail,
      date,
      time,
      status: status || "pending",
    });
    res.status(200).json({
      status: "success",
      payload: newBooking,
      message: "Cita Agendada con exito",
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

router.post("/:bid/services/:sid", async (req, res) => {
  try {
    const { sid, bid } = req.params;
    const serviceExists = await serviceManager.getServiceById(sid);
    if (!serviceExists) {
      return res.status(400).json({
        status: "error",
        message: `El servicio conel id${sid} no existe`,
      });
    }
    const updatedBooking = await bookingManager.addServiceToBooking(bid, sid);
    res.status(200).json({ status: "success", payload: updatedBooking });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

export default router;
