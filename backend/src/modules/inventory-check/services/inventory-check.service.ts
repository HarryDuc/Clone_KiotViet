import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InventoryCheck } from '../schemas/inventory-check.schema';
import { CreateInventoryCheckDTO, UpdateInventoryCheckDTO } from '../dtos/inventory-check.dto';

@Injectable()
export class InventoryCheckService {
  constructor(
    @InjectModel('InventoryChecks') private inventoryCheckModel: Model<InventoryCheck>,
  ) { }

  async create(createInventoryCheckDto: CreateInventoryCheckDTO): Promise<InventoryCheck> {
    const createdCheck = new this.inventoryCheckModel(createInventoryCheckDto);
    return createdCheck.save();
  }

  async findAll(): Promise<InventoryCheck[]> {
    return this.inventoryCheckModel
      .find()
      .populate('branch')
      .populate('createdBy')
      .populate('approvedBy')
      .exec();
  }

  async findOne(id: string): Promise<InventoryCheck> {
    const check = await this.inventoryCheckModel
      .findById(id)
      .populate('branch')
      .populate('createdBy')
      .populate('approvedBy')
      .exec();
    if (!check) {
      throw new NotFoundException(`Inventory check with ID ${id} not found`);
    }
    return check;
  }

  async update(id: string, updateInventoryCheckDto: UpdateInventoryCheckDTO): Promise<InventoryCheck> {
    const check = await this.inventoryCheckModel
      .findByIdAndUpdate(id, updateInventoryCheckDto, { new: true })
      .populate('branch')
      .populate('createdBy')
      .populate('approvedBy')
      .exec();
    if (!check) {
      throw new NotFoundException(`Inventory check with ID ${id} not found`);
    }
    return check;
  }

  async remove(id: string): Promise<InventoryCheck> {
    const check = await this.inventoryCheckModel.findByIdAndDelete(id).exec();
    if (!check) {
      throw new NotFoundException(`Inventory check with ID ${id} not found`);
    }
    return check;
  }
}