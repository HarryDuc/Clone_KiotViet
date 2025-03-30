import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand } from '../schemas/brand.schema';

@Injectable()
export class BrandService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) { }

  async create(createBrandDto: { name: string; location: string }): Promise<Brand> {
    const createdBrand = new this.brandModel(createBrandDto);
    return createdBrand.save();
  }

  async findAll(): Promise<Brand[]> {
    return this.brandModel.find().exec();
  }

  async findOne(id: string): Promise<Brand> {
    const brand = await this.brandModel.findById(id).exec();
    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }
    return brand;
  }
}