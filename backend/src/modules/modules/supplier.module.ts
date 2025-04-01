import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SupplierController } from '../controllers/supplier.controller';
import { SupplierService } from '../services/supplier.service';
import { Supplier, SupplierSchema } from '../schemas/supplier.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Suppliers', schema: SupplierSchema }
    ]),
  ],
  controllers: [SupplierController],
  providers: [SupplierService],
  exports: [SupplierService],
})
export class SupplierModule { }
