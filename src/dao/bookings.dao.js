import { BookingModel } from "../dao/models/bookings.model.js";

export class BookingDao {
  async create(bookingData) {
    return await BookingModel.create(bookingData);
  }
  async getBookingById(id) {
    return await BookingModel.findById(id);
  }
  async addServiceToBooking(bookingData, id) {
    return await BookingModel.findByIdAndUpdate(id, {
      $push: { services: bookingData.services },
    });
  }
}
export default BookingDao;
