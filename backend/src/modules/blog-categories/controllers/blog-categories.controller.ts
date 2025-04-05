import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { BlogCategoriesService } from '../services/blog-categories.service';
import { BlogCategories } from '../schemas/blog-categories.schema';

@Controller('api/blog-categories')
export class BlogCategoriesController {
  constructor(private readonly blogCategoriesService: BlogCategoriesService) { }

  @Post()
  async create(@Body() createBlogCategoriesDto: any): Promise<BlogCategories> {
    return this.blogCategoriesService.create(createBlogCategoriesDto);
  }

  @Get()
  async findAll(@Query() query: any): Promise<BlogCategories[]> {
    return this.blogCategoriesService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BlogCategories> {
    return this.blogCategoriesService.findOne(id);
  }

  @Get(':slug')
  async findBySlug(@Param('slug') slug: string): Promise<BlogCategories> {
    return this.blogCategoriesService.findBySlug(slug);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBlogCategoriesDto: any,
  ): Promise<BlogCategories> {
    return this.blogCategoriesService.update(id, updateBlogCategoriesDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<BlogCategories> {
    return this.blogCategoriesService.remove(id);
  }
}