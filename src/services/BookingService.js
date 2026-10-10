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
}
export default BookingService;
