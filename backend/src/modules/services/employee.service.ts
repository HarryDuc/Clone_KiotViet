import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee, EmployeeDocument } from '../schemas/employee.schema';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
  ) { }

  async create(createEmployeeDto: any): Promise<Employee> {
    const createdEmployee = new this.employeeModel(createEmployeeDto);
    return createdEmployee.save();
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeModel
      .find()
      .populate('branchSalary')
      .populate('branchWork')
      .populate('position')
      .populate('department')
      .populate('userAccount')
      .populate('commissionTable')
      .exec();
  }

  async findOne(id: string): Promise<Employee> {
    const employee = await this.employeeModel
      .findById(id)
      .populate('branchSalary')
      .populate('branchWork')
      .populate('position')
      .populate('department')
      .populate('userAccount')
      .populate('commissionTable')
      .exec();
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  async update(id: string, updateEmployeeDto: any): Promise<Employee> {
    const employee = await this.employeeModel
      .findByIdAndUpdate(id, updateEmployeeDto, { new: true })
      .populate('branchSalary')
      .populate('branchWork')
      .populate('position')
      .populate('department')
      .populate('userAccount')
      .populate('commissionTable')
      .exec();
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  async remove(id: string): Promise<Employee> {
    const employee = await this.employeeModel.findByIdAndDelete(id).exec();
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return employee;
  }
}