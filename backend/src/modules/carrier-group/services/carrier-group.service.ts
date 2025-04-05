import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CarrierGroup } from '../schemas/carrier-group.schema';
import { CreateCarrierGroupDTO, UpdateCarrierGroupDTO } from '../dtos/carrier-group.dto';

@Injectable()
export class CarrierGroupService {
  constructor(
    @InjectModel('CarrierGroups') private carrierGroupModel: Model<CarrierGroup>,
  ) { }

  async create(createCarrierGroupDto: CreateCarrierGroupDTO): Promise<CarrierGroup> {
    const lastCarrierGroup = await this.carrierGroupModel.findOne().sort({ groupId: -1 }).exec();
    let newCarrierGroupId = 'CG00001';
  
    if (lastCarrierGroup && lastCarrierGroup.groupId) {
      const lastNumber = parseInt(lastCarrierGroup.groupId.replace('CG', ''), 10);
      const nextNumber = lastNumber + 1;
      newCarrierGroupId = `CG${nextNumber.toString().padStart(5, '0')}`;
    }
  
    const createdCarrierGroup = new this.carrierGroupModel({
      ...createCarrierGroupDto,
      carrierGroupId: newCarrierGroupId
    });
  
    return createdCarrierGroup.save();
  }

  async findAll(): Promise<CarrierGroup[]> {
    return this.carrierGroupModel.find().exec();
  }

  async findOne(id: string): Promise<CarrierGroup> {
    const carrierGroup = await this.carrierGroupModel.findById(id).exec();
    if (!carrierGroup) {
      throw new NotFoundException(`carrierGroup with ID ${id} not found`);
    }
    return carrierGroup;
  }

  async update(id: string, updateCarrierGroupDto: UpdateCarrierGroupDTO): Promise<CarrierGroup> {
    const carrierGroup = await this.carrierGroupModel
      .findByIdAndUpdate(id, updateCarrierGroupDto, { new: true })
      .exec();
    if (!carrierGroup) {
      throw new NotFoundException(`carrierGroup with ID ${id} not found`);
    }
    return carrierGroup;
  }

  async remove(id: string): Promise<CarrierGroup> {
    const carrierGroup = await this.carrierGroupModel.findByIdAndDelete(id).exec();
    if (!carrierGroup) {
      throw new NotFoundException(`carrierGroup with ID ${id} not found`);
    }
    return carrierGroup;
  }
}