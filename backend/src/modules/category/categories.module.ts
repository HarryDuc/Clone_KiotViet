import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesController } from '../controllers/categories.controller';
import { CategoriesService } from '../supplier/services/categories.service';
import { Categories, CategoriesSchema } from '../supplier/schemas/categories.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Categories', schema: CategoriesSchema }])
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService]
})
export class CategoriesModule { }
