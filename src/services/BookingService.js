import BookingsRepository from "../repositories/bookings.repository.js";
import crypto from "crypto";

export class BookingService {
  constructor() {
    this.repository = new BookingsRepository();
  }
  async createBooking(BookingData) {
    const { clientName, clientEmail, date, time, status } = BookingData;
    if (!clientName || !clientEmail || !date || !time || !status) {
      throw new Error("Por favor completa todos los campos");
    }
    const services = [];
    const newBooking = {
      id: crypto.randomUUID(),
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
      throw new Error(`La reserva con id ${bid} no se encuentra`);
    }

    booking.services ??= [];
    const serviceIndex = booking.services.findIndex(
      (item) => String(item.service) === String(sid),
    );

    if (serviceIndex !== -1) {
      booking.services[serviceIndex].quantity += 1;
    } else {
      booking.services.push({ service: sid, quantity: 1 });
    }
    await this.repository.addServiceToBooking(booking);
    return booking;
  }
}
export default BookingService;
