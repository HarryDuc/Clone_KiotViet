import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerController } from '../controllers/customer.controller';
import { CustomerService } from '../supplier/services/customer.service';
import { Customer, CustomerSchema } from '../supplier/schemas/customer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Customers', schema: CustomerSchema }])
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService]
})
export class CustomerModule { }