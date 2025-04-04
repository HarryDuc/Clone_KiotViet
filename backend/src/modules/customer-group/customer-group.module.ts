import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerGroupSchema } from './schemas/customer-group.schema';
import { CustomerGroupController } from './controllers/customer-group.controller';
import { CustomerGroupService } from './services/customer-group.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'CustomerGroups', schema: CustomerGroupSchema }])
  ],
  controllers: [CustomerGroupController],
  providers: [CustomerGroupService],
  exports: [CustomerGroupService]
})
export class CustomerModule { }