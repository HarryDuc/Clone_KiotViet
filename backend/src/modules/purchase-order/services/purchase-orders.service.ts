import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PurchaseOrder } from '../purchase-order/schemas/purchase-orders.schema';

@Injectable()
export class PurchaseOrderService {
  constructor(
    @InjectModel('PurchaseOrders') private PurchaseOrderModel: Model<PurchaseOrder>,
  ) { }

  async create(createPurchaseOrderDto: any): Promise<PurchaseOrder> {
    const lastPurchaseOrder = await this.PurchaseOrderModel.findOne().sort({ purchaseOrderId: -1 }).exec();
    let newPurchaseOrderId = 'PO0001';
  
    if (lastPurchaseOrder && lastPurchaseOrder.purchaseOrderId) {
      const lastNumber = parseInt(lastPurchaseOrder.purchaseOrderId.replace('PO', ''), 10);
      const nextNumber = lastNumber + 1;
      newPurchaseOrderId = `PO${nextNumber.toString().padStart(4, '0')}`;
    }
  
    const createdPurchaseOrder = new this.PurchaseOrderModel({
      ...createPurchaseOrderDto,
      purchaseOrderId: newPurchaseOrderId
    });
  
    return createdPurchaseOrder.save();
  }

  async findAll(): Promise<PurchaseOrder[]> {
    return this.PurchaseOrderModel.find().exec();
  }

  async findOne(id: string): Promise<PurchaseOrder> {
    const PurchaseOrder = await this.PurchaseOrderModel.findById(id).exec();
    if (!PurchaseOrder) {
      throw new NotFoundException(`PurchaseOrder with ID ${id} not found`);
    }
    return PurchaseOrder;
  }

  async update(id: string, updatePurchaseOrderDto: any): Promise<PurchaseOrder> {
    const PurchaseOrder = await this.PurchaseOrderModel
      .findByIdAndUpdate(id, updatePurchaseOrderDto, { new: true })
      .exec();
    if (!PurchaseOrder) {
      throw new NotFoundException(`PurchaseOrder with ID ${id} not found`);
    }
    return PurchaseOrder;
  }

  async remove(id: string): Promise<PurchaseOrder> {
    const PurchaseOrder = await this.PurchaseOrderModel.findByIdAndDelete(id).exec();
    if (!PurchaseOrder) {
      throw new NotFoundException(`PurchaseOrder with ID ${id} not found`);
    }
    return PurchaseOrder;
  }
}