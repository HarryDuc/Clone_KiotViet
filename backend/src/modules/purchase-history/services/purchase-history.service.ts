import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PurchaseHistory } from '../schemas/purchase-history.schema';
import { CreatePurchaseHistoryDTO, UpdatePurchaseHistoryDTO } from '../dtos/purchase-history.dto';
@Injectable()
export class PurchaseHistoryService {
  constructor(
    @InjectModel('PurchaseHistories') private PurchaseHistoryModel: Model<PurchaseHistory>,
  ) { }

  async create(createPurchaseHistoryDto: CreatePurchaseHistoryDTO): Promise<PurchaseHistory> {
    const lastPurchaseHistory = await this.PurchaseHistoryModel.findOne().sort({ purchaseHistoryId: -1 }).exec();
    let newPurchaseHistoryId = 'PH0001';
  
    if (lastPurchaseHistory && lastPurchaseHistory.purchaseHistoryId) {
      const lastNumber = parseInt(lastPurchaseHistory.purchaseHistoryId.replace('PH', ''), 10);
      const nextNumber = lastNumber + 1;
      newPurchaseHistoryId = `PH${nextNumber.toString().padStart(4, '0')}`;
    }
  
    const createdPurchaseHistory = new this.PurchaseHistoryModel({
      ...createPurchaseHistoryDto,
      purchaseHistoryId: newPurchaseHistoryId
    });
  
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

  async update(id: string, updatePurchaseHistoryDto: UpdatePurchaseHistoryDTO): Promise<PurchaseHistory> {
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