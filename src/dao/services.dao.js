import { ServiceModel } from "../dao/models/service.model.js";

export class ServiceDao {
  async createService(serviceData) {
    return await ServiceModel.create(serviceData);
  }
  async getById(id) {
    return await ServiceModel.findById(id).lean();
  }
  async getAll(filter = {}, sort = {}, skip = 0, limit) {
    const query = ServiceModel.find(filter).sort(sort).skip(skip);
    if (limit !== undefined) {
      query.limit(limit);
    }

    const [services, total] = await Promise.all([
      query.lean(),
      ServiceModel.countDocuments(filter),
    ]);

    return { services, total };
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
