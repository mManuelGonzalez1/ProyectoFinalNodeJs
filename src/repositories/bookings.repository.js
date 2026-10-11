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
  async addServiceToBooking(bookingData) {
    return await this.dao.addServiceToBooking(bookingData);
  }
}
export default BookingsRepository;
