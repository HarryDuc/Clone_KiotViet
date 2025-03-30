import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categories, CategoriesDocument } from '../schemas/categories.schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Categories.name) private categoriesModel: Model<CategoriesDocument>,
  ) { }

  async create(createCategoriesDto: any): Promise<Categories> {
    const createdCategory = new this.categoriesModel(createCategoriesDto);
    return createdCategory.save();
  }

  async findAll(): Promise<Categories[]> {
    return this.categoriesModel.find().populate('parentCategory').exec();
  }

  async findOne(id: string): Promise<Categories> {
    const category = await this.categoriesModel.findById(id).populate('parentCategory').exec();
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async update(id: string, updateCategoriesDto: any): Promise<Categories> {
    const category = await this.categoriesModel
      .findByIdAndUpdate(id, updateCategoriesDto, { new: true })
      .populate('parentCategory')
      .exec();
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async remove(id: string): Promise<Categories> {
    const category = await this.categoriesModel.findByIdAndDelete(id).exec();
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }
}
