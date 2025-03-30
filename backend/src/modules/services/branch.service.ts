import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Branch } from '../schemas/branch.schema';

@Injectable()
export class BranchService {
  constructor(@InjectModel(Branch.name) private branchModel: Model<Branch>) { }

  async create(createBranchDto: { name: string; location: string }): Promise<Branch> {
    // Tạo branchId duy nhất bằng cách kết hợp timestamp và random string
    const timestamp = Date.now().toString();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const branchId = `BR${timestamp}${randomStr}`;

    const createdBranch = new this.branchModel({
      ...createBranchDto,
      branchId
    });
    return createdBranch.save();
  }

  async findAll(): Promise<Branch[]> {
    return this.branchModel.find().exec();
  }

  async findOne(id: string): Promise<Branch> {
    const branch = await this.branchModel.findById(id).exec();
    if (!branch) {
      throw new NotFoundException(`Branch with ID ${id} not found`);
    }
    return branch;
  }
}