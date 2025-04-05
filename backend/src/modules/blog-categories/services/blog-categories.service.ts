import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogCategories } from '../schemas/blog-categories.schema';
import { CreateBlogCategoriesDTO, UpdateBlogCategoriesDTO } from '../dtos/blog-categories.dto';

@Injectable()
export class BlogCategoriesService {
  constructor(
    @InjectModel('BlogCategories')
    private blogCategoriesModel: Model<BlogCategories>,
  ) { }

  async create(createBlogCategoriesDto: CreateBlogCategoriesDTO): Promise<BlogCategories> {
    const created = new this.blogCategoriesModel(createBlogCategoriesDto);
    return created.save();
  }

  async findAll(query: any = {}): Promise<BlogCategories[]> {
    return this.blogCategoriesModel.find(query).exec();
  }

  async findOne(id: string): Promise<BlogCategories> {
    const categories = await this.blogCategoriesModel.findById(id).exec();
    if (!categories) {
      throw new NotFoundException(`Blog categories with ID ${id} not found`);
    }
    return categories;
  }

  async findBySlug(slug: string): Promise<BlogCategories> {
    const categories = await this.blogCategoriesModel.findOne({ slug }).exec();
    if (!categories) {
      throw new NotFoundException(`Blog categories with slug ${slug} not found`);
    }
    return categories;
  }

  async update(id: string, updateBlogCategoriesDto: UpdateBlogCategoriesDTO): Promise<BlogCategories> {
    const categories = await this.blogCategoriesModel
      .findByIdAndUpdate(id, updateBlogCategoriesDto, { new: true })
      .exec();
    if (!categories) {
      throw new NotFoundException(`Blog categories with ID ${id} not found`);
    }
    return categories;
  }

  async remove(id: string): Promise<BlogCategories> {
    const categories = await this.blogCategoriesModel.findByIdAndDelete(id).exec();
    if (!categories) {
      throw new NotFoundException(`Blog categories with ID ${id} not found`);
    }
    return categories;
  }
}