import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReturnPurchase } from '../schemas/return-purchase.schema';
import { CreateReturnPurchaseDTO, UpdateReturnPurchaseDTO } from '../dtos/return-purchase.dto';
@Injectable()
export class ReturnPurchaseService {
  constructor(
    @InjectModel('ReturnPurchases') private ReturnPurchaseModel: Model<ReturnPurchase>,
  ) { }

  async create(createReturnPurchaseDto: CreateReturnPurchaseDTO): Promise<ReturnPurchase> {
    const lastReturnPurchase = await this.ReturnPurchaseModel.findOne().sort({ returnPurchaseId: -1 }).exec();
    let newReturnPurchaseId = 'RP00001';
  
    if (lastReturnPurchase && lastReturnPurchase.returnPurchaseId) {
      const lastNumber = parseInt(lastReturnPurchase.returnPurchaseId.replace('RP', ''), 10);
      const nextNumber = lastNumber + 1;
      newReturnPurchaseId = `RP${nextNumber.toString().padStart(5, '0')}`;
    }
  
    const createdReturnPurchase = new this.ReturnPurchaseModel({
      ...createReturnPurchaseDto,
      returnPurchaseId: newReturnPurchaseId
    });
  
    return createdReturnPurchase.save();
  }

  async findAll(): Promise<ReturnPurchase[]> {
    return this.ReturnPurchaseModel.find().exec();
  }

  async findOne(id: string): Promise<ReturnPurchase> {
    const ReturnPurchase = await this.ReturnPurchaseModel.findById(id).exec();
    if (!ReturnPurchase) {
      throw new NotFoundException(`ReturnPurchase with ID ${id} not found`);
    }
    return ReturnPurchase;
  }

  async update(id: string, updateReturnPurchaseDto: UpdateReturnPurchaseDTO): Promise<ReturnPurchase> {
    const ReturnPurchase = await this.ReturnPurchaseModel
      .findByIdAndUpdate(id, updateReturnPurchaseDto, { new: true })
      .exec();
    if (!ReturnPurchase) {
      throw new NotFoundException(`ReturnPurchase with ID ${id} not found`);
    }
    return ReturnPurchase;
  }

  async remove(id: string): Promise<ReturnPurchase> {
    const ReturnPurchase = await this.ReturnPurchaseModel.findByIdAndDelete(id).exec();
    if (!ReturnPurchase) {
      throw new NotFoundException(`ReturnPurchase with ID ${id} not found`);
    }
    return ReturnPurchase;
  }
}