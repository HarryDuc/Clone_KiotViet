import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SupplierGroup, SupplierGroupSchema } from '../schemas/supplier-group.schema';
import { SupplierGroupController } from '../controllers/supplier-group.controller';
import { SupplierGroupService } from '../services/supplier-group.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'SupplierGroups', schema: SupplierGroupSchema }])
  ],
  controllers: [SupplierGroupController],
  providers: [SupplierGroupService],
  exports: [SupplierGroupService]
})
export class SupplierGroupModule { }
