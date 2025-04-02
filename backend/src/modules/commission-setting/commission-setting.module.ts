import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommissionDetailSchema, CommissionSetting, CommissionSettingSchema } from '../supplier/schemas/commission-setting.schema';
import { CommissionSettingController } from '../controllers/commission-setting.controller';
import { CommissionSettingService } from '../supplier/services/commission-setting.service';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'CommissionSettings', schema: CommissionSettingSchema }])
  ],
  controllers: [CommissionSettingController],
  providers: [CommissionSettingService],
  exports: [CommissionSettingService]
})
export class CommissionSettingModule { }
