import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoyaltyProgram, LoyaltyProgramDocument } from '../schemas/loyalty-program.schema';

@Injectable()
export class LoyaltyProgramService {
  constructor(
    @InjectModel(LoyaltyProgram.name) private loyaltyProgramModel: Model<LoyaltyProgramDocument>,
  ) { }

  async create(createLoyaltyProgramDto: any): Promise<LoyaltyProgram> {
    const createdProgram = new this.loyaltyProgramModel(createLoyaltyProgramDto);
    return createdProgram.save();
  }

  async findAll(): Promise<LoyaltyProgram[]> {
    return this.loyaltyProgramModel
      .find()
      .populate('branch')
      .populate('createdBy')
      .populate('customerGroup')
      .exec();
  }

  async findOne(id: string): Promise<LoyaltyProgram> {
    const program = await this.loyaltyProgramModel
      .findById(id)
      .populate('branch')
      .populate('createdBy')
      .populate('customerGroup')
      .exec();
    if (!program) {
      throw new NotFoundException(`Loyalty program with ID ${id} not found`);
    }
    return program;
  }

  async update(id: string, updateLoyaltyProgramDto: any): Promise<LoyaltyProgram> {
    const program = await this.loyaltyProgramModel
      .findByIdAndUpdate(id, updateLoyaltyProgramDto, { new: true })
      .populate('branch')
      .populate('createdBy')
      .populate('customerGroup')
      .exec();
    if (!program) {
      throw new NotFoundException(`Loyalty program with ID ${id} not found`);
    }
    return program;
  }

  async remove(id: string): Promise<LoyaltyProgram> {
    const program = await this.loyaltyProgramModel.findByIdAndDelete(id).exec();
    if (!program) {
      throw new NotFoundException(`Loyalty program with ID ${id} not found`);
    }
    return program;
  }
}