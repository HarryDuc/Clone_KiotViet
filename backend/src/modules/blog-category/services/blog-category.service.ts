import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogCategory } from '../blog-category/schemas/blog-category.schema';

@Injectable()
export class BlogCategoryService {
  constructor(
    @InjectModel(BlogCategory.name)
    private blogCategoryModel: Model<BlogCategory>,
  ) { }

  async create(createBlogCategoryDto: any): Promise<BlogCategory> {
    const created = new this.blogCategoryModel(createBlogCategoryDto);
    return created.save();
  }

  async findAll(query: any = {}): Promise<BlogCategory[]> {
    return this.blogCategoryModel.find(query).exec();
  }

  async findOne(id: string): Promise<BlogCategory> {
    const category = await this.blogCategoryModel.findById(id).exec();
    if (!category) {
      throw new NotFoundException(`Blog category with ID ${id} not found`);
    }
    return category;
  }

  async findBySlug(slug: string): Promise<BlogCategory> {
    const category = await this.blogCategoryModel.findOne({ slug }).exec();
    if (!category) {
      throw new NotFoundException(`Blog category with slug ${slug} not found`);
    }
    return category;
  }

  async update(id: string, updateBlogCategoryDto: any): Promise<BlogCategory> {
    const category = await this.blogCategoryModel
      .findByIdAndUpdate(id, updateBlogCategoryDto, { new: true })
      .exec();
    if (!category) {
      throw new NotFoundException(`Blog category with ID ${id} not found`);
    }
    return category;
  }

  async remove(id: string): Promise<BlogCategory> {
    const category = await this.blogCategoryModel.findByIdAndDelete(id).exec();
    if (!category) {
      throw new NotFoundException(`Blog category with ID ${id} not found`);
    }
    return category;
  }
}