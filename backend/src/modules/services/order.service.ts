import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../schemas/order.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
  ) { }

  async create(createOrderDto: any): Promise<Order> {
    const createdOrder = new this.orderModel(createOrderDto);
    return createdOrder.save();
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel
      .find()
      .populate('customerId')
      .populate('products.productId')
      .populate('channel')
      .populate('carrierId')
      .exec();
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderModel
      .findById(id)
      .populate('customerId')
      .populate('products.productId')
      .populate('channel')
      .populate('carrierId')
      .exec();
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async update(id: string, updateOrderDto: any): Promise<Order> {
    const order = await this.orderModel
      .findByIdAndUpdate(id, updateOrderDto, { new: true })
      .populate('customerId')
      .populate('products.productId')
      .populate('channel')
      .populate('carrierId')
      .exec();
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async remove(id: string): Promise<Order> {
    const order = await this.orderModel.findByIdAndDelete(id).exec();
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }
}