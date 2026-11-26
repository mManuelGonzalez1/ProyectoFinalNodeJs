import BookingsRepository from "../repositories/bookings.repository.js";

export class BookingService {
  constructor() {
    this.repository = new BookingsRepository();
  }
  async createBooking(BookingData) {
    const { clientName, clientEmail, date, time, status, serviceId } =
      BookingData;
    if (
      !BookingData.clientName ||
      !BookingData.clientEmail ||
      !BookingData.date ||
      !BookingData.time ||
      !BookingData.status
    ) {
      const error = new Error("Por favor completa todos los campos");
      error.statusCode = 400;
      throw error;
    }
    const services = serviceId ? [{ service: serviceId, quantity: 1 }] : [];
    const newBooking = {
      clientName,
      clientEmail,
      date,
      time,
      status,
      services,
    };
    return this.repository.create(newBooking);
  }
  async getBookingById(id) {
    return this.repository.getById(id);
  }
  async addServiceToBooking(bid, sid) {
    const booking = await this.repository.getById(bid);

    if (!booking) {
      const error = new Error(`La reserva con id ${bid} no se encuentra`);
      error.statusCode = 404;
      throw error;
    }

    booking.services = booking.services || [];
    const serviceIndex = booking.services.findIndex(
      (item) => String(item.service) === String(sid),
    );

    if (serviceIndex !== -1) {
      booking.services[serviceIndex].quantity += 1;
    } else {
      booking.services.push({ service: sid, quantity: 1 });
    }
    return this.repository.addServiceToBooking(booking);
  }
}
export default BookingService;
