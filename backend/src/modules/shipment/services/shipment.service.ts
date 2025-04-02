import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shipment } from '../shipment/schemas/shipment.schema';

@Injectable()
export class ShipmentService {
  constructor(
    @InjectModel('Shipments')
    private shipmentModel: Model<Shipment>,
  ) { }

  async create(createShipmentDto: any): Promise<Shipment> {
    const lastShipment = await this.shipmentModel.findOne().sort({ shipmentId: -1 }).exec();
    let newShipmentId = 'SM0001';
  
    if (lastShipment && lastShipment.shipmentId) {
      const lastNumber = parseInt(lastShipment.shipmentId.replace('SM', ''), 10);
      const nextNumber = lastNumber + 1;
      newShipmentId = `SM${nextNumber.toString().padStart(4, '0')}`;
    }
  
    const createdShipment = new this.shipmentModel({
      ...createShipmentDto,
      shipmentId: newShipmentId
    });
  
    return createdShipment.save();
  }

  async findAll(query: any = {}): Promise<Shipment[]> {
    return this.shipmentModel.find(query).exec();
  }

  async findOne(id: string): Promise<Shipment> {
    const shipment = await this.shipmentModel.findById(id).exec();
    if (!shipment) {
      throw new NotFoundException(`Shipment with ID ${id} not found`);
    }
    return shipment;
  }

  async update(id: string, updateShipmentDto: any): Promise<Shipment> {
    const shipment = await this.shipmentModel
      .findByIdAndUpdate(id, updateShipmentDto, { new: true })
      .exec();
    if (!shipment) {
      throw new NotFoundException(`Shipment with ID ${id} not found`);
    }
    return shipment;
  }

  async remove(id: string): Promise<Shipment> {
    const shipment = await this.shipmentModel.findByIdAndDelete(id).exec();
    if (!shipment) {
      throw new NotFoundException(`Shipment with ID ${id} not found`);
    }
    return shipment;
  }

  async updateStatus(id: string, status: string): Promise<Shipment> {
    const shipment = await this.shipmentModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .exec();
    if (!shipment) {
      throw new NotFoundException(`Shipment with ID ${id} not found`);
    }
    return shipment;
  }

  async updateTracking(id: string, tracking: any): Promise<Shipment> {
    const shipment = await this.shipmentModel
      .findByIdAndUpdate(id, { tracking }, { new: true })
      .exec();
    if (!shipment) {
      throw new NotFoundException(`Shipment with ID ${id} not found`);
    }
    return shipment;
  }

  async updateCarrier(id: string, carrierId: string): Promise<Shipment> {
    const shipment = await this.shipmentModel
      .findByIdAndUpdate(id, { carrier: carrierId }, { new: true })
      .exec();
    if (!shipment) {
      throw new NotFoundException(`Shipment with ID ${id} not found`);
    }
    return shipment;
  }

  async findByStore(storeId: string): Promise<Shipment[]> {
    return this.shipmentModel.find({ storeId }).exec();
  }

  async findByOrder(orderId: string): Promise<Shipment[]> {
    return this.shipmentModel.find({ order: orderId }).exec();
  }
}