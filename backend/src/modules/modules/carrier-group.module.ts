import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarrierGroup, CarrierGroupSchema } from '../schemas/carrier-group.schema';
import { CarrierGroupController } from '../controllers/carrier-group.controller';
import { CarrierGroupService } from '../services/carrier-group.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'CarrierGroups', schema: CarrierGroupSchema }])
  ],
  controllers: [CarrierGroupController],
  providers: [CarrierGroupService],
  exports: [CarrierGroupService]
})
export class CarrierGroupModule { }
