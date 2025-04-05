import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PriceListSchema } from './schemas/price-list.schema';
import { PriceListService } from './services/price-list.service';
import { PriceListController } from  './controllers/price-list.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'PriceLists', schema: PriceListSchema }])
  ],
  controllers: [PriceListController],
  providers: [PriceListService],
  exports: [PriceListService]
})
export class PriceListModule { }
