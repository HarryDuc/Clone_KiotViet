import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogPostController } from './controllers/blog-post.controller';
import { BlogCategoryController } from './controllers/blog-category.controller';
import { BlogPostService } from './services/blog-post.service';
import { BlogCategoryService } from './services/blog-category.service';
import { BlogPost, BlogPostSchema } from './schemas/blog-post.schema';
import { BlogCategory, BlogCategorySchema } from './schemas/blog-category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BlogPost.name, schema: BlogPostSchema },
      { name: BlogCategory.name, schema: BlogCategorySchema },
    ]),
  ],
  controllers: [BlogPostController, BlogCategoryController],
  providers: [BlogPostService, BlogCategoryService],
  exports: [BlogPostService, BlogCategoryService],
})
export class BlogModule { }