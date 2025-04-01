import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payroll } from '../schemas/payroll.schema';

@Injectable()
export class PayrollService {
  constructor(
    @InjectModel('Payrolls') private payrollModel: Model<Payroll>,
  ) { }

  async create(createPayrollDto: any): Promise<Payroll> {
    const createdpayroll = new this.payrollModel(createPayrollDto);
    return createdpayroll.save();
  }

  async findAll(): Promise<Payroll[]> {
    return this.payrollModel.find().exec();
  }

  async findOne(id: string): Promise<Payroll> {
    const payroll = await this.payrollModel.findById(id).exec();
    if (!payroll) {
      throw new NotFoundException(`payroll with ID ${id} not found`);
    }
    return payroll;
  }

  async update(id: string, updatePayrollDto: any): Promise<Payroll> {
    const payroll = await this.payrollModel
      .findByIdAndUpdate(id, updatePayrollDto, { new: true })
      .exec();
    if (!payroll) {
      throw new NotFoundException(`payroll with ID ${id} not found`);
    }
    return payroll;
  }

  async remove(id: string): Promise<Payroll> {
    const payroll = await this.payrollModel.findByIdAndDelete(id).exec();
    if (!payroll) {
      throw new NotFoundException(`payroll with ID ${id} not found`);
    }
    return payroll;
  }
}