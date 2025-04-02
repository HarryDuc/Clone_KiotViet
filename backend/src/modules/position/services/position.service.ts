import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Position } from '../schemas/position.schema';

@Injectable()
export class PositionService {
  constructor(
    @InjectModel('Positions') private PositionModel: Model<Position>,
  ) { }

  async create(createPositionDto: any): Promise<Position> {
    const lastPosition = await this.PositionModel.findOne().sort({ positionId: -1 }).exec();
    let newPositionId = 'CV0001';
  
    if (lastPosition && lastPosition.positionId) {
      const lastNumber = parseInt(lastPosition.positionId.replace('CV', ''), 10);
      const nextNumber = lastNumber + 1;
      newPositionId = `CV${nextNumber.toString().padStart(4, '0')}`;
    }
  
    const createdPosition = new this.PositionModel({
      ...createPositionDto,
      positionId: newPositionId
    });
  
    return createdPosition.save();
  }

  async findAll(): Promise<Position[]> {
    return this.PositionModel.find().exec();
  }

  async findOne(id: string): Promise<Position> {
    const position = await this.PositionModel.findById(id).exec();
    if (!position) {
      throw new NotFoundException(`Position with ID ${id} not found`);
    }
    return position;
  }

  async update(id: string, updatePositionDto: any): Promise<Position> {
    const position = await this.PositionModel
      .findByIdAndUpdate(id, updatePositionDto, { new: true })
      .exec();
    if (!position) {
      throw new NotFoundException(`Position with ID ${id} not found`);
    }
    return position;
  }

  async remove(id: string): Promise<Position> {
    const position = await this.PositionModel.findByIdAndDelete(id).exec();
    if (!position) {
      throw new NotFoundException(`Position with ID ${id} not found`);
    }
    return position;
  }
}