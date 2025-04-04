import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categories } from '../schemas/categories.schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Categories') private categoriesModel: Model<Categories>,
  ) { }

  async create(createCategoriesDto: any): Promise<Categories> {
    const lastCategories = await this.categoriesModel.findOne().sort({ categoryId: -1 }).exec();
    let newCategoryId = 'CT0001';
  
    if (lastCategories && lastCategories.categoryId) {
      const lastNumber = parseInt(lastCategories.categoryId.replace('CT', ''), 10);
      const nextNumber = lastNumber + 1;
      newCategoryId = `CT${nextNumber.toString().padStart(4, '0')}`;
    }
  
    const createdCategories = new this.categoriesModel({
      ...createCategoriesDto,
      categoryId: newCategoryId
    });
  
    return createdCategories.save();
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
