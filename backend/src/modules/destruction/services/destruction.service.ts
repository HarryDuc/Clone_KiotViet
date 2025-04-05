import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Destruction } from '../schemas/destructions.schema';
import { CreateDestructionDTO, UpdateDestructionDTO } from '../dtos/destruction.dto';

@Injectable()
export class DestructionService {
  constructor(
    @InjectModel('Destructions') private destructionModel: Model<Destruction>,
  ) { }

  async create(createDestructionDto: CreateDestructionDTO): Promise<Destruction> {
    const lastDestruction = await this.destructionModel.findOne().sort({ destructionId: -1 }).exec();
    let newDestructionId = 'DTS00001';
  
    if (lastDestruction && lastDestruction.destructionId) {
      const lastNumber = parseInt(lastDestruction.destructionId.replace('DTS', ''), 10);
      const nextNumber = lastNumber + 1;
      newDestructionId = `DTS${nextNumber.toString().padStart(5, '0')}`;
    }
  
    const createdDestruction = new this.destructionModel({
      ...createDestructionDto,
      destructionId: newDestructionId
    });
  
    return createdDestruction.save();
  }

  async findAll(): Promise<Destruction[]> {
    return this.destructionModel.find().exec();
  }

  async findOne(id: string): Promise<Destruction> {
    const destruction = await this.destructionModel.findById(id).exec();
    if (!destruction) {
        throw new NotFoundException(`Destruction with ID ${id} not found`);
    }
    return destruction;
  }

  async update(id: string, updateDestructionDto: UpdateDestructionDTO): Promise<Destruction> {
    const destruction = await this.destructionModel
      .findByIdAndUpdate(id, updateDestructionDto, { new: true })
      .exec();
    if (!destruction) {
      throw new NotFoundException(`Destruction with ID ${id} not found`);
    }
    return destruction;
  }

  async remove(id: string): Promise<Destruction> {
    const destruction = await this.destructionModel.findByIdAndDelete(id).exec();
    if (!destruction) {
        throw new NotFoundException(`Destruction with ID ${id} not found`);
    }
    return destruction;
  }
}