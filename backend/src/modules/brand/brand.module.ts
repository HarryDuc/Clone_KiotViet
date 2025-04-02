import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandController } from '../controllers/brand.controller';
import { BrandService } from '../supplier/services/brand.service';
import { Brand, BrandSchema } from '../supplier/schemas/brand.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Brands', schema: BrandSchema }])
  ],
  controllers: [BrandController],
  providers: [BrandService],
  exports: [BrandService]
})
export class BrandModule { }
