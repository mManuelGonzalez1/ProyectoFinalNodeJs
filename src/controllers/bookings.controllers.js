import BookingService from "../services/BookingService.js";
import ServicesService from "../services/ServiceService.js";
const servicesService = new ServicesService();
const bookingService = new BookingService();

export const getBookingsById = async (req, res) => {
  try {
    const { bid } = req.params;
    const booking = await bookingService.getBookingByIdWithServices(bid);

    if (!booking) {
      return res
        .status(404)
        .json({ status: "error", message: "Reserva no encontrada" });
    }
    res.status(200).json({ status: "success", payload: booking });
  } catch (error) {
    const statusCode =
      error.statusCode || (error.name === "CastError" ? 400 : 500);
    res.status(statusCode).json({ status: "error", message: error.message });
  }
};

export const createBooking = async (req, res) => {
  try {
    const { clientName, clientEmail, date, time, status } = req.body;
    if (!clientName || !clientEmail || !date || !time) {
      return res.status(400).json({
        status: "error",
        message: "Faltan datos, por favor ingresalos para mostrar la info",
      });
    }

    const newBooking = await bookingService.createBooking({
      clientName,
      clientEmail,
      date,
      time,
      status: status || "pending",
    });
    res.status(201).json({
      status: "success",
      payload: newBooking,
      message: "Cita Agendada con exito",
    });
  } catch (e) {
    const statusCode =
      e.statusCode ||
      (e.name === "ValidationError" || e.name === "CastError" ? 400 : 500);
    res.status(statusCode).json({ status: "error", message: e.message });
  }
};

export const addServiceToBooking = async (req, res) => {
  try {
    const { sid, bid } = req.params;
    const serviceExists = await servicesService.getById(sid);
    if (!serviceExists) {
      return res.status(404).json({
        status: "error",
        message: `El servicio con el id ${sid} no existe`,
      });
    }
    const updatedBooking = await bookingService.addServiceToBooking(bid, sid);
    res.status(200).json({ status: "success", payload: updatedBooking });
  } catch (error) {
    const statusCode =
      error.statusCode ||
      (error.name === "CastError" || error.name === "ValidationError"
        ? 400
        : 500);
    res.status(statusCode).json({ status: "error", message: error.message });
  }
};
