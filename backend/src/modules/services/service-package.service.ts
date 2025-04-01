import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServicePackage } from '../schemas/service-package.schems';

@Injectable()
export class ServicePackageService {
  constructor(
    @InjectModel(ServicePackage.name) private ServicePackageModel: Model<ServicePackage>,
  ) { }

  async create(createServicePackageDto: any): Promise<ServicePackage> {
    const createdServicePackage = new this.ServicePackageModel(createServicePackageDto);
    return createdServicePackage.save();
  }

  async findAll(): Promise<ServicePackage[]> {
    return this.ServicePackageModel.find().exec();
  }

  async findOne(id: string): Promise<ServicePackage> {
    const ServicePackage = await this.ServicePackageModel.findById(id).exec();
    if (!ServicePackage) {
      throw new NotFoundException(`ServicePackage with ID ${id} not found`);
    }
    return ServicePackage;
  }

  async update(id: string, updateServicePackageDto: any): Promise<ServicePackage> {
    const ServicePackage = await this.ServicePackageModel
      .findByIdAndUpdate(id, updateServicePackageDto, { new: true })
      .exec();
    if (!ServicePackage) {
      throw new NotFoundException(`ServicePackage with ID ${id} not found`);
    }
    return ServicePackage;
  }

  async remove(id: string): Promise<ServicePackage> {
    const ServicePackage = await this.ServicePackageModel.findByIdAndDelete(id).exec();
    if (!ServicePackage) {
      throw new NotFoundException(`ServicePackage with ID ${id} not found`);
    }
    return ServicePackage;
  }
}