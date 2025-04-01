import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PurchaseHistory } from '../schemas/purchase-history.schema';

@Injectable()
export class PurchaseHistoryService {
  constructor(
    @InjectModel('PurchaseHistories') private PurchaseHistoryModel: Model<PurchaseHistory>,
  ) { }

  async create(createPurchaseHistoryDto: any): Promise<PurchaseHistory> {
    const createdPurchaseHistory = new this.PurchaseHistoryModel(createPurchaseHistoryDto);
    return createdPurchaseHistory.save();
  }

  async findAll(): Promise<PurchaseHistory[]> {
    return this.PurchaseHistoryModel.find().exec();
  }

  async findOne(id: string): Promise<PurchaseHistory> {
    const PurchaseHistory = await this.PurchaseHistoryModel.findById(id).exec();
    if (!PurchaseHistory) {
      throw new NotFoundException(`PurchaseHistory with ID ${id} not found`);
    }
    return PurchaseHistory;
  }

  async update(id: string, updatePurchaseHistoryDto: any): Promise<PurchaseHistory> {
    const PurchaseHistory = await this.PurchaseHistoryModel
      .findByIdAndUpdate(id, updatePurchaseHistoryDto, { new: true })
      .exec();
    if (!PurchaseHistory) {
      throw new NotFoundException(`PurchaseHistory with ID ${id} not found`);
    }
    return PurchaseHistory;
  }

  async remove(id: string): Promise<PurchaseHistory> {
    const PurchaseHistory = await this.PurchaseHistoryModel.findByIdAndDelete(id).exec();
    if (!PurchaseHistory) {
      throw new NotFoundException(`PurchaseHistory with ID ${id} not found`);
    }
    return PurchaseHistory;
  }
}