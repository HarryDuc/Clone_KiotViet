import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Shipment, ShipmentSchema } from '../schemas/shipment.schema';
import { ShipmentController } from '../controllers/shipment.controller';
import { ShipmentService } from '../services/shipment.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Shipment.name, schema: ShipmentSchema }])
  ],
  controllers: [ShipmentController],
  providers: [ShipmentService],
  exports: [ShipmentService]
})
export class ShipmentModule { }
