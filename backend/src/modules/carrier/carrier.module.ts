import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Carrier, CarrierSchema } from './schemas/carrier.schema';
import { CarrierService } from './services/carrier.service';
import { CarrierController } from './controllers/carrier.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Carriers', schema: CarrierSchema }])
  ],
  controllers: [CarrierController],
  providers: [CarrierService],
  exports: [CarrierService]
})
export class CarrierModule { }
