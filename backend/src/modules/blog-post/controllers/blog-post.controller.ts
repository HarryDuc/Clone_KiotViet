import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../schemas/blog-post.schema';

@Controller('blog-posts')
export class BlogPostController {
  constructor(private readonly blogPostService: BlogPostService) { }

  @Post()
  async create(@Body() createBlogPostDto: any): Promise<BlogPost> {
    return this.blogPostService.create(createBlogPostDto);
  }

  @Get()
  async findAll(@Query() query: any): Promise<BlogPost[]> {
    return this.blogPostService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BlogPost> {
    return this.blogPostService.findOne(id);
  }

  @Get('slug/:slug')
  async findBySlug(@Param('slug') slug: string): Promise<BlogPost> {
    return this.blogPostService.findBySlug(slug);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBlogPostDto: any,
  ): Promise<BlogPost> {
    return this.blogPostService.update(id, updateBlogPostDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<BlogPost> {
    return this.blogPostService.remove(id);
  }

  @Put(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ): Promise<BlogPost> {
    return this.blogPostService.update(id, { status });
  }

  @Post(':id/publish')
  async publish(@Param('id') id: string): Promise<BlogPost> {
    return this.blogPostService.update(id, {
      status: 'published',
      'settings.publishDate': new Date(),
    });
  }

  @Post(':id/archive')
  async archive(@Param('id') id: string): Promise<BlogPost> {
    return this.blogPostService.update(id, { status: 'archived' });
  }

  @Post(':id/feature')
  async feature(@Param('id') id: string): Promise<BlogPost> {
    return this.blogPostService.update(id, { 'settings.isFeatured': true });
  }

  @Post(':id/unfeature')
  async unfeature(@Param('id') id: string): Promise<BlogPost> {
    return this.blogPostService.update(id, { 'settings.isFeatured': false });
  }

  @Post(':id/sticky')
  async makeSticky(@Param('id') id: string): Promise<BlogPost> {
    return this.blogPostService.update(id, { 'settings.isSticky': true });
  }

  @Post(':id/unsticky')
  async removeSticky(@Param('id') id: string): Promise<BlogPost> {
    return this.blogPostService.update(id, { 'settings.isSticky': false });
  }
}