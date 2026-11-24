import { ServiceModel } from "../dao/models/service.model.js";

export class ServiceDao {
  async createService(serviceData) {
    return await ServiceModel.create(serviceData);
  }
  async getById(id) {
    return await ServiceModel.findById(id);
  }
  async getAll() {
    return await ServiceModel.find();
  }
  async update(id, updatedData) {
    return await ServiceModel.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });
  }
  async delete(id) {
    return await ServiceModel.findByIdAndDelete(id);
  }
}
export default ServiceDao;
