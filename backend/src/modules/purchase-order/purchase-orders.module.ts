import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PurchaseOrder, PurchaseOrderSchema } from './schemas/purchase-orders.schema';
import { PurchaseOrderController } from './controllers/purchase-orders.controller';
import { PurchaseOrderService } from './services/purchase-orders.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'PurchaseOrders', schema: PurchaseOrderSchema }])
  ],
  controllers: [PurchaseOrderController],
  providers: [PurchaseOrderService],
  exports: [PurchaseOrderService]
})
export class PurchaseOrderModule { }
