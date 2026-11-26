import { ServiceModel } from "../dao/models/service.model.js";

export class ServiceDao {
  async createService(serviceData) {
    return await ServiceModel.create(serviceData);
  }
  async getById(id) {
    return await ServiceModel.findById(id).lean();
  }
  async getAll() {
    return await ServiceModel.find().lean();
  }
  async update(id, updatedData) {
    return await ServiceModel.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    }).lean();
  }
  async delete(id) {
    return await ServiceModel.findByIdAndDelete(id).lean();
  }
}
export default ServiceDao;
