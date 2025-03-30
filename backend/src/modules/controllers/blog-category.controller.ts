import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { BlogCategoryService } from '../services/blog-category.service';
import { BlogCategory } from '../schemas/blog-category.schema';

@Controller('blog-categories')
export class BlogCategoryController {
  constructor(private readonly blogCategoryService: BlogCategoryService) { }

  @Post()
  async create(@Body() createBlogCategoryDto: any): Promise<BlogCategory> {
    return this.blogCategoryService.create(createBlogCategoryDto);
  }

  @Get()
  async findAll(@Query() query: any): Promise<BlogCategory[]> {
    return this.blogCategoryService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BlogCategory> {
    return this.blogCategoryService.findOne(id);
  }

  @Get('slug/:slug')
  async findBySlug(@Param('slug') slug: string): Promise<BlogCategory> {
    return this.blogCategoryService.findBySlug(slug);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBlogCategoryDto: any,
  ): Promise<BlogCategory> {
    return this.blogCategoryService.update(id, updateBlogCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<BlogCategory> {
    return this.blogCategoryService.remove(id);
  }
}