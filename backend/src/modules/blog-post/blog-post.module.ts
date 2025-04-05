import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogPostSchema } from './schemas/blog-post.schema';
import { BlogCategoriesController } from '../blog-categories/controllers/blog-categories.controller';
import { BlogPostService } from './services/blog-post.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'BlogPost', schema: BlogPostSchema }]),
  ],
  controllers: [BlogCategoriesController],
  providers: [BlogPostService],
  exports: [BlogPostService]
})
export class BlogPostModule { }
