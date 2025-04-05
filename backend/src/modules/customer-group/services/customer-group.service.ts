import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomerGroup } from '../schemas/customer-group.schema';
import { CreateCustomerGroupDTO, UpdateCustomerGroupDTO } from '../dtos/customer-group.dto';
@Injectable()
export class CustomerGroupService {
  constructor(
    @InjectModel('CustomerGroups') private customerGroupModel: Model<CustomerGroup>,
  ) { }

  async create(createCustomerGroupDto: CreateCustomerGroupDTO): Promise<CustomerGroup> {
    const lastCustomerGroup = await this.customerGroupModel.findOne().sort({ groupId: -1 }).exec();
    let newCustomerGroupId = 'KHG00001';
  
    if (lastCustomerGroup && lastCustomerGroup.groupId) {
      const lastNumber = parseInt(lastCustomerGroup.groupId.replace('KHG', ''), 10);
      const nextNumber = lastNumber + 1;
      newCustomerGroupId = `KHG${nextNumber.toString().padStart(5, '0')}`;
    }
  
    const createdCustomerGroup = new this.customerGroupModel({
      ...createCustomerGroupDto,
      groupId: newCustomerGroupId
    });
  
    return createdCustomerGroup.save();
  }

  async findAll(): Promise<CustomerGroup[]> {
    return this.customerGroupModel.find().exec();
  }

  async findOne(id: string): Promise<CustomerGroup> {
    const customerGroup = await this.customerGroupModel.findById(id).exec();
    if (!customerGroup) {
      throw new NotFoundException(`CustomerGroup with ID ${id} not found`);
    }
    return customerGroup;
  }

  async update(id: string, updateCustomerGroupDto: UpdateCustomerGroupDTO): Promise<CustomerGroup> {
    const customerGroup = await this.customerGroupModel
      .findByIdAndUpdate(id, updateCustomerGroupDto, { new: true })
      .exec();
    if (!customerGroup) {
      throw new NotFoundException(`CustomerGroup with ID ${id} not found`);
    }
    return customerGroup;
  }

  async remove(id: string): Promise<CustomerGroup> {
    const customerGroup = await this.customerGroupModel.findByIdAndDelete(id).exec();
    if (!customerGroup) {
      throw new NotFoundException(`CustomerGroup with ID ${id} not found`);
    }
    return customerGroup;
  }
}