import BookingService from "../services/BookingService.js";
import ServicesService from "../services/ServiceService.js";
const servicesService = new ServicesService();
const bookingService = new BookingService();

export const getBookingsById = async (req, res) => {
  try {
    const { bid } = req.params;
    const bookings = await bookingService.getBookingById(bid);

    if (!bookings) {
      return res
        .status(400)
        .json({ status: "error", message: "Servicio Agendado no encontrado" });
    }
    res.status(200).json({ status: "success", payload: bookings });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
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
    res.status(200).json({
      status: "success",
      payload: newBooking,
      message: "Cita Agendada con exito",
    });
  } catch (e) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const addServiceToBooking = async (req, res) => {
  try {
    const { sid, bid } = req.params;
    const serviceExists = await servicesService.getById(sid);
    if (!serviceExists) {
      return res.status(400).json({
        status: "error",
        message: `El servicio con el id${sid} no existe`,
      });
    }
    const updatedBooking = await bookingService.addServiceToBooking(bid, sid);
    res.status(200).json({ status: "success", payload: updatedBooking });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
