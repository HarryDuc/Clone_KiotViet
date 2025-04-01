import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SupplierGroup } from '../schemas/supplier-group.schema';

@Injectable()
export class SupplierGroupService {
  constructor(
    @InjectModel('SupplierGroups') private SupplierGroupModel: Model<SupplierGroup>,
  ) { }

  async create(createSupplierGroupDto: any): Promise<SupplierGroup> {
    const createdSupplierGroup = new this.SupplierGroupModel(createSupplierGroupDto);
    return createdSupplierGroup.save();
  }

  async findAll(): Promise<SupplierGroup[]> {
    return this.SupplierGroupModel.find().exec();
  }

  async findOne(id: string): Promise<SupplierGroup> {
    const SupplierGroup = await this.SupplierGroupModel.findById(id).exec();
    if (!SupplierGroup) {
      throw new NotFoundException(`SupplierGroup with ID ${id} not found`);
    }
    return SupplierGroup;
  }

  async update(id: string, updateSupplierGroupDto: any): Promise<SupplierGroup> {
    const SupplierGroup = await this.SupplierGroupModel
      .findByIdAndUpdate(id, updateSupplierGroupDto, { new: true })
      .exec();
    if (!SupplierGroup) {
      throw new NotFoundException(`SupplierGroup with ID ${id} not found`);
    }
    return SupplierGroup;
  }

  async remove(id: string): Promise<SupplierGroup> {
    const SupplierGroup = await this.SupplierGroupModel.findByIdAndDelete(id).exec();
    if (!SupplierGroup) {
      throw new NotFoundException(`SupplierGroup with ID ${id} not found`);
    }
    return SupplierGroup;
  }
}