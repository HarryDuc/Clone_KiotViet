import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Return } from '../schemas/return.schema';
import { CreateReturnDTO, UpdateReturnDTO } from '../dtos/return.dto';
@Injectable()
export class ReturnService {
  constructor(
    @InjectModel('Returns') private ReturnModel: Model<Return>,
  ) { }

  async create(createReturnDto: CreateReturnDTO): Promise<Return> {
    const lastReturn = await this.ReturnModel.findOne().sort({ returnId: -1 }).exec();
    let newReturnId = 'RT00001';
  
    if (lastReturn && lastReturn.returnId) {
      const lastNumber = parseInt(lastReturn.returnId.replace('RT', ''), 10);
      const nextNumber = lastNumber + 1;
      newReturnId = `RT${nextNumber.toString().padStart(5, '0')}`;
    }
  
    const createdReturn = new this.ReturnModel({
      ...createReturnDto,
      returnId: newReturnId
    });
  
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

  async update(id: string, updateReturnDto: UpdateReturnDTO): Promise<Return> {
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