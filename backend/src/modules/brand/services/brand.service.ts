import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand } from '../schemas/brand.schema';
import { CreateBrandDTO, UpdateBrandDTO } from '../dtos/brand.dto';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel('Brands') private brandModel: Model<Brand>,
  ) { }

  async create(createBrandDto: CreateBrandDTO): Promise<Brand> {
    const lastBrand = await this.brandModel.findOne().sort({ brandId: -1 }).exec();
    let newBrandId = 'BR00001';

    if (lastBrand && lastBrand.brandId) {
      const lastNumber = parseInt(lastBrand.brandId.replace('BR', ''), 10);
      const nextNumber = lastNumber + 1;
      newBrandId = `BR${nextNumber.toString().padStart(5, '0')}`;
    }

    const createdBrand = new this.brandModel({
      ...createBrandDto,
      brandId: newBrandId
    });

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

  async update(id: string, updateBrandDto: UpdateBrandDTO): Promise<Brand> {
    const brand = await this.brandModel
      .findByIdAndUpdate(id, updateBrandDto, { new: true })
      .exec();
    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }
    return brand;
  }

  async remove(id: string): Promise<Brand> {
    const brand = await this.brandModel.findByIdAndDelete(id).exec();
    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }
    return brand;
  }
}