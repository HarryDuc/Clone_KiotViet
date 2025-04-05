import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SaleChannelSchema } from './schemas/sale-channel.schema';
import { SaleChannelController } from './controllers/sale-channel.controller';
import { SaleChannelService } from './services/sale-channel.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'SaleChannels', schema: SaleChannelSchema }])
  ],
  controllers: [SaleChannelController],
  providers: [SaleChannelService],
  exports: [SaleChannelService]
})
export class SaleChannelModule { }
