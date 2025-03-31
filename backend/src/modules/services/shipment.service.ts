import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shipment } from '../schemas/shipment.schema';

@Injectable()
export class ShipmentService {
  constructor(
    @InjectModel(Shipment.name)
    private shipmentModel: Model<Shipment>,
  ) { }

  async create(createShipmentDto: any): Promise<Shipment> {
    const created = new this.shipmentModel(createShipmentDto);
    return created.save();
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