import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Position } from '../schemas/position.schema';
import { CreatePositionDTO, UpdatePositionDTO } from '../dtos/position.dto';
@Injectable()
export class PositionService {
  constructor(
    @InjectModel('Positions') private PositionModel: Model<Position>,
  ) { }

  async create(createPositionDto: CreatePositionDTO): Promise<Position> {
    const lastPosition = await this.PositionModel.findOne().sort({ positionId: -1 }).exec();
    let newPositionId = 'CV00001';
  
    if (lastPosition && lastPosition.positionId) {
      const lastNumber = parseInt(lastPosition.positionId.replace('CV', ''), 10);
      const nextNumber = lastNumber + 1;
      newPositionId = `CV${nextNumber.toString().padStart(5, '0')}`;
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

  async update(id: string, updatePositionDto: UpdatePositionDTO): Promise<Position> {
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