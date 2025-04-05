import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReturnPurchaseSchema } from './schemas/return-purchase.schema';
import { ReturnPurchaseController } from './controllers/return-purchase.controller';
import { ReturnPurchaseService } from './services/return-purchase.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'ReturnPurchases', schema: ReturnPurchaseSchema }])
  ],
  controllers: [ReturnPurchaseController],
  providers: [ReturnPurchaseService],
  exports: [ReturnPurchaseService]
})
export class ReturnPurchaseModule { }
