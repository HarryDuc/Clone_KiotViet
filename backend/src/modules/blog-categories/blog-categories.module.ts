import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogCategoriesSchema } from './schemas/blog-categories.schema';
import { BlogCategoriesController } from './controllers/blog-categories.controller';
import { BlogCategoriesService } from './services/blog-categories.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'BlogCategories', schema: BlogCategoriesSchema }]),
  ],
  controllers: [BlogCategoriesController],
  providers: [BlogCategoriesService],
  exports: [BlogCategoriesService]
})
export class BlogCategoriesModule { }
