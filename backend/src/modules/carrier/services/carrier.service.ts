import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Carrier } from '../schemas/carrier.schema';

@Injectable()
export class CarrierService {
  constructor(@InjectModel('Carriers') private CarrierModel: Model<Carrier>) {}

  async create(createCarrierDto: any): Promise<Carrier> {
    const lastCarrier = await this.CarrierModel.findOne().sort({ carrierId: -1 }).exec();
    let newCarrierId = 'CG0001';
  
    if (lastCarrier && lastCarrier.carrierId) {
      const lastNumber = parseInt(lastCarrier.carrierId.replace('CG', ''), 10);
      const nextNumber = lastNumber + 1;
      newCarrierId = `CG${nextNumber.toString().padStart(4, '0')}`;
    }
  
    const createdCarrier = new this.CarrierModel({
      ...createCarrierDto,
      carrierId: newCarrierId
    });
  
    return createdCarrier.save();
  }
  async findAll(): Promise<Carrier[]> {
    return this.CarrierModel.find().exec();
  }

  async findOne(id: string): Promise<Carrier> {
    const brand = await this.CarrierModel.findById(id).exec();
    if (!brand) {
      throw new NotFoundException(`Carrier with ID ${id} not found`);
    }
    return brand;
  }

  async update(id: string, updateBrandDto: any): Promise<Carrier> {
    const brand = await this.CarrierModel.findByIdAndUpdate(
      id,
      updateBrandDto,
      { new: true },
    ).exec();
    if (!brand) {
      throw new NotFoundException(`Carrier with ID ${id} not found`);
    }
    return brand;
  }

  async remove(id: string): Promise<Carrier> {
    const brand = await this.CarrierModel.findByIdAndDelete(id).exec();
    if (!brand) {
      throw new NotFoundException(`Carrier with ID ${id} not found`);
    }
    return brand;
  }
}
