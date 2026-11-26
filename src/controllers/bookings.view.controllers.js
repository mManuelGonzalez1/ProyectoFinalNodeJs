import BookingService from "../services/BookingService.js";
import ServicesService from "../services/ServiceService.js";

const bookingService = new BookingService();
const servicesService = new ServicesService();

export const renderBookingForm = (req, res) => {
  res.status(200).render("booking-form", {
    title: "Agendar una cita",
    values: { status: "pending" },
  });
};

export const createBookingView = async (req, res) => {
  const { clientName, clientEmail, date, time, status, serviceId } = req.body;
  const values = { clientName, clientEmail, date, time, status, serviceId };

  if (!clientName || !clientEmail || !date || !time || !status || !serviceId) {
    return res.status(400).render("booking-form", {
      title: "Agendar una cita",
      error: "Completa todos los campos para agendar la cita.",
      values,
    });
  }

  try {
    const service = await servicesService.getById(serviceId);
    if (!service) {
      return res.status(400).render("booking-form", {
        title: "Agendar una cita",
        error: "No encontramos un servicio con ese ID.",
        values,
      });
    }

    const booking = await bookingService.createBooking({
      clientName,
      clientEmail,
      date,
      time,
      status,
      serviceId,
    });
    return res.status(201).render("booking", {
      title: "Cita agendada",
      booking: booking.toObject(),
    });
  } catch (error) {
    console.error("Error al crear la reserva para la vista:", error);
    const statusCode =
      error.name === "CastError" || error.name === "ValidationError"
        ? 400
        : error.statusCode || 500;
    return res.status(statusCode).render("booking-form", {
      title: "Agendar una cita",
      error:
        statusCode === 400
          ? error.message
          : "No se pudo guardar la reserva. Inténtalo nuevamente.",
      values,
    });
  }
};

export const renderBookingById = async (req, res) => {
  try {
    const booking = await bookingService.getBookingById(req.params.bid);

    if (!booking) {
      return res.status(404).render("booking-not-found", {
        title: "Reserva no encontrada",
      });
    }

    return res.status(200).render("booking", {
      title: "Detalles de la reserva",
      booking: booking.toObject(),
    });
  } catch (error) {
    console.error("Error al obtener la reserva para la vista:", error);
    const isInvalidId = error.name === "CastError";
    return res.status(isInvalidId ? 404 : 500).render("booking-not-found", {
      title: isInvalidId ? "Reserva no encontrada" : "Error al cargar la reserva",
      message: isInvalidId ? undefined : "No fue posible consultar la reserva.",
    });
  }
};
