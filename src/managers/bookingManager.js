import fs from "fs/promises";
import crypto from "crypto";

class BookingManager {
  constructor(path = "./src/data/bookings.json") {
    this.path = path;
  }
  async #readFile() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (e) {
      return [];
    }
  }

  async #writeFile(data) {
    await fs.writeFile(this.path, JSON.stringify(data, null, 2));
  }

  async getBookings() {
    return await this.#readFile();
  }

  async getBookingsById(id) {
    const bookings = await this.getBookings();
    return bookings.find((book) => String(book.id) === String(id)) ?? null;
  }

  async createBooking(BookingData) {
    const bookings = await this.#readFile();
    const { clientName, clientEmail, date, time, status } = BookingData;
    if (
      clientName === undefined ||
      clientName === "" ||
      clientEmail === undefined ||
      clientEmail === "" ||
      date === undefined ||
      date === "" ||
      time === undefined ||
      time === "" ||
      status === undefined ||
      status === ""
    ) {
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
    bookings.push(newBooking);
    await this.#writeFile(bookings);
    return newBooking;
  }

  async addServiceToBooking(bid, sid) {
    const bookings = await this.#readFile();
    const booking = bookings.find((item) => String(item.id) === String(bid));

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

    await this.#writeFile(bookings);
    return booking;
  }
}
export default BookingManager;
