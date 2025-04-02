import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Department } from '../schemas/department.schema';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel('Departments') private departmentModel: Model<Department>,
  ) { }

  async create(createDepartmentDto: any): Promise<Department> {
    const lastDepartment = await this.departmentModel.findOne().sort({ departmentId: -1 }).exec();
    let newDepartmentId = 'DV0001';
  
    if (lastDepartment && lastDepartment.departmentId) {
      const lastNumber = parseInt(lastDepartment.departmentId.replace('DV', ''), 10);
      const nextNumber = lastNumber + 1;
      newDepartmentId = `DV${nextNumber.toString().padStart(4, '0')}`;
    }
  
    const createdDepartment = new this.departmentModel({
      ...createDepartmentDto,
      departmentId: newDepartmentId
    });
  
    return createdDepartment.save();
  }

  async findAll(): Promise<Department[]> {
    return this.departmentModel.find().exec();
  }

  async findOne(id: string): Promise<Department> {
    const department = await this.departmentModel.findById(id).exec();
    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }
    return department;
  }

  async update(id: string, updateDepartmentDto: any): Promise<Department> {
    const department = await this.departmentModel
      .findByIdAndUpdate(id, updateDepartmentDto, { new: true })
      .exec();
    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }
    return department;
  }

  async remove(id: string): Promise<Department> {
    const department = await this.departmentModel.findByIdAndDelete(id).exec();
    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }
    return department;
  }
}