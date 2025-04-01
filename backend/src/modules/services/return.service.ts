import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Return } from '../schemas/return.schema';

@Injectable()
export class ReturnService {
  constructor(
    @InjectModel('Returns') private ReturnModel: Model<Return>,
  ) { }

  async create(createReturnDto: any): Promise<Return> {
    const createdReturn = new this.ReturnModel(createReturnDto);
    return createdReturn.save();
  }

  async findAll(): Promise<Return[]> {
    return this.ReturnModel.find().exec();
  }

  async findOne(id: string): Promise<Return> {
    const Return = await this.ReturnModel.findById(id).exec();
    if (!Return) {
      throw new NotFoundException(`Return with ID ${id} not found`);
    }
    return Return;
  }

  async update(id: string, updateReturnDto: any): Promise<Return> {
    const Return = await this.ReturnModel
      .findByIdAndUpdate(id, updateReturnDto, { new: true })
      .exec();
    if (!Return) {
      throw new NotFoundException(`Return with ID ${id} not found`);
    }
    return Return;
  }

  async remove(id: string): Promise<Return> {
    const Return = await this.ReturnModel.findByIdAndDelete(id).exec();
    if (!Return) {
      throw new NotFoundException(`Return with ID ${id} not found`);
    }
    return Return;
  }
}