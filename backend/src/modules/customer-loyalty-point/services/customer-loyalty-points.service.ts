import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomerLoyaltyPoints } from './schemas/customer-loyalty-points.schema';

@Injectable()
export class CustomerLoyaltyPointsService {
  constructor(
    @InjectModel(CustomerLoyaltyPoints.name) private customerLoyaltyPointsModel: Model<CustomerLoyaltyPoints>,
  ) { }

  async create(createCustomerLoyaltyPointsDto: any): Promise<CustomerLoyaltyPoints> {
    const createdPoints = new this.customerLoyaltyPointsModel(createCustomerLoyaltyPointsDto);
    return createdPoints.save();
  }

  async findAll(): Promise<CustomerLoyaltyPoints[]> {
    return this.customerLoyaltyPointsModel
      .find()
      .populate('customer')
      .populate('program')
      .populate('transaction')
      .exec();
  }

  async findOne(id: string): Promise<CustomerLoyaltyPoints> {
    const points = await this.customerLoyaltyPointsModel
      .findById(id)
      .populate('customer')
      .populate('program')
      .populate('transaction')
      .exec();
    if (!points) {
      throw new NotFoundException(`Customer loyalty points with ID ${id} not found`);
    }
    return points;
  }

  async update(id: string, updateCustomerLoyaltyPointsDto: any): Promise<CustomerLoyaltyPoints> {
    const points = await this.customerLoyaltyPointsModel
      .findByIdAndUpdate(id, updateCustomerLoyaltyPointsDto, { new: true })
      .populate('customer')
      .populate('program')
      .populate('transaction')
      .exec();
    if (!points) {
      throw new NotFoundException(`Customer loyalty points with ID ${id} not found`);
    }
    return points;
  }

  async remove(id: string): Promise<CustomerLoyaltyPoints> {
    const points = await this.customerLoyaltyPointsModel.findByIdAndDelete(id).exec();
    if (!points) {
      throw new NotFoundException(`Customer loyalty points with ID ${id} not found`);
    }
    return points;
  }
}