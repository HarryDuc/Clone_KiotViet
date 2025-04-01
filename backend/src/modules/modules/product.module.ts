import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from '../controllers/product.controller';
import { ProductService } from '../services/product.service';
import { ProductSchema } from '../schemas/product.schema';
import { BrandModule } from './brand.module';
import { CategoriesModule } from './categories.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Products', schema: ProductSchema }]),
    BrandModule,
    CategoriesModule
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService]
})
export class ProductModule { }
