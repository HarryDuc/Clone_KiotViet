import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PurchaseHistory, PurchaseHistorySchema } from './schemas/purchase-history.schema';
import { PurchaseHistoryService } from './services/purchase-history.service';
import { PurchaseHistoryController } from './controllers/purchase-history.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'PurchaseHistories', schema: PurchaseHistorySchema }])
  ],
  controllers: [PurchaseHistoryController],
  providers: [PurchaseHistoryService],
  exports: [PurchaseHistoryService]
})
export class PurchaseHistoryModule { }
