import BookingDao from "../dao/bookings.dao.js";

export class BookingsRepository {
  constructor() {
    this.dao = new BookingDao();
  }
  async create(serviceData) {
    return await this.dao.create(serviceData);
  }
  async getById(id) {
    return await this.dao.getBookingById(id);
  }
}
export default BookingsRepository;
