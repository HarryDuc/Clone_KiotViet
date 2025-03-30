import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServicePackage, ServicePackageDocument } from '../schemas/service-package.schema';

@Injectable()
export class ServicePackageService {
  constructor(
    @InjectModel(ServicePackage.name) private servicePackageModel: Model<ServicePackageDocument>,
  ) { }

  async create(createServicePackageDto: any): Promise<ServicePackage> {
    const createdServicePackage = new this.servicePackageModel(createServicePackageDto);
    return createdServicePackage.save();
  }

  async findAll(): Promise<ServicePackage[]> {
    return this.servicePackageModel.find().exec();
  }

  async findOne(id: string): Promise<ServicePackage> {
    const servicePackage = await this.servicePackageModel.findById(id).exec();
    if (!servicePackage) {
      throw new NotFoundException(`Service Package with ID ${id} not found`);
    }
    return servicePackage;
  }

  async update(id: string, updateServicePackageDto: any): Promise<ServicePackage> {
    const servicePackage = await this.servicePackageModel
      .findByIdAndUpdate(id, updateServicePackageDto, { new: true })
      .exec();
    if (!servicePackage) {
      throw new NotFoundException(`Service Package with ID ${id} not found`);
    }
    return servicePackage;
  }

  async remove(id: string): Promise<ServicePackage> {
    const servicePackage = await this.servicePackageModel.findByIdAndDelete(id).exec();
    if (!servicePackage) {
      throw new NotFoundException(`Service Package with ID ${id} not found`);
    }
    return servicePackage;
  }
}