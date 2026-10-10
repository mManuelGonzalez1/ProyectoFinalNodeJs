import fs from "fs/promises";
const PATH = "../proyectoFinalNodeJS/src/data/bookings.json";

export class BookingDao {
  async #readFile() {
    try {
      const data = await fs.readFile(PATH, "utf-8");
      return JSON.parse(data);
    } catch (e) {
      return [];
    }
  }

  async #writeFile(data) {
    await fs.writeFile(PATH, JSON.stringify(data, null, 2));
  }
  async create(bookingData) {
    const bookings = await this.#readFile();
    bookings.push(bookingData);
    await this.#writeFile(bookings);
    return bookingData;
  }
  async getBookingById(id) {
    const bookings = await this.#readFile();
    return bookings.find((book) => String(book.id) === String(id)) ?? null;
  }
}
export default BookingDao;
