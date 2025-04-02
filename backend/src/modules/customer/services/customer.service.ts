import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from '../schemas/customer.schema';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('Customers') private customerModel: Model<Customer>,
  ) { }

  async create(createCustomerDto: any): Promise<Customer> {
    const lastCustomer = await this.customerModel.findOne().sort({ customerId: -1 }).exec();
    let newCustomerId = 'KH0001';
  
    if (lastCustomer && lastCustomer.customerId) {
      const lastNumber = parseInt(lastCustomer.customerId.replace('KH', ''), 10);
      const nextNumber = lastNumber + 1;
      newCustomerId = `KH${nextNumber.toString().padStart(4, '0')}`;
    }
  
    const createdCustomer = new this.customerModel({
      ...createCustomerDto,
      customerId: newCustomerId
    });
  
    return createdCustomer.save();
  }

  async findAll(): Promise<Customer[]> {
    return this.customerModel.find().populate('group').exec();
  }

  async findOne(id: string): Promise<Customer> {
    const customer = await this.customerModel.findById(id).populate('group').exec();
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  async update(id: string, updateCustomerDto: any): Promise<Customer> {
    const customer = await this.customerModel
      .findByIdAndUpdate(id, updateCustomerDto, { new: true })
      .populate('group')
      .exec();
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  async remove(id: string): Promise<Customer> {
    const customer = await this.customerModel.findByIdAndDelete(id).exec();
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }
}