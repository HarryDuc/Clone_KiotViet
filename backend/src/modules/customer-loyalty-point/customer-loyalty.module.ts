import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerLoyaltyPointsSchema } from './schemas/customer-loyalty-points.schema';
import { CustomerLoyaltyPointsService } from './services/customer-loyalty-points.service';
import { CustomerLoyaltyPointsController } from './controllers/customer-loyalty-points.controller';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'CustomerLoyalty', schema: CustomerLoyaltyPointsSchema }])
  ],
  controllers: [CustomerLoyaltyPointsController],
  providers: [CustomerLoyaltyPointsService],
  exports: [CustomerLoyaltyPointsService]
})
export class CustomerLoyaltyPointsModule { }