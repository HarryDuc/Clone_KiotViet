import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payroll } from '../schemas/payroll.schema';
import { CreatePayrollDTO, UpdatePayrollDTO } from '../dtos/payroll.dto';
@Injectable()
export class PayrollService {
  constructor(
    @InjectModel('Payrolls') private payrollModel: Model<Payroll>,
  ) { }

  async create(createPayrollDto: CreatePayrollDTO): Promise<Payroll> {
    const lastPayroll = await this.payrollModel.findOne().sort({ payrollId: -1 }).exec();
    let newPayrollId = 'PR00001';
  
    if (lastPayroll && lastPayroll.payrollId) {
      const lastNumber = parseInt(lastPayroll.payrollId.replace('PR', ''), 10);
      const nextNumber = lastNumber + 1;
      newPayrollId = `PR${nextNumber.toString().padStart(5, '0')}`;
    }
  
    const createdPayroll = new this.payrollModel({
      ...createPayrollDto,
      payrollId: newPayrollId
    });
  
    return createdPayroll.save();
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

  async update(id: string, updatePayrollDto: UpdatePayrollDTO): Promise<Payroll> {
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