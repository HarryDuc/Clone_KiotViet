import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServicePackage } from '../schemas/service-package.schems';
import { CreateServicePackageDTO, UpdateServicePackageDTO } from '../dtos/service-package.dto';

@Injectable()
export class ServicePackageService {
  constructor(
    @InjectModel('ServicePackages') private ServicePackageModel: Model<ServicePackage>,
  ) { }

  async create(createServicePackageDto: CreateServicePackageDTO): Promise<ServicePackage> {
    const lastServicePackage = await this.ServicePackageModel.findOne().sort({ packageId: -1 }).exec();
    let newServicePackageId = 'SVP00001';
  
    if (lastServicePackage && lastServicePackage.packageId) {
      const lastNumber = parseInt(lastServicePackage.packageId.replace('SVP', ''), 10);
      const nextNumber = lastNumber + 1;
      newServicePackageId = `SVP${nextNumber.toString().padStart(5, '0')}`;
    }
  
    const createdServicePackage = new this.ServicePackageModel({
      ...createServicePackageDto,
      servicePackageId: newServicePackageId
    });
  
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

  async update(id: string, updateServicePackageDto: UpdateServicePackageDTO): Promise<ServicePackage> {
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