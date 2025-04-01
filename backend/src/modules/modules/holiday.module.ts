import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Holiday, HolidaySchema } from '../schemas/holiday.schema';
import { HolidayController } from '../controllers/holiday.controller';
import { HolidayService } from '../services/holiday.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Holidays', schema: HolidaySchema }])
  ],
  controllers: [HolidayController],
  providers: [HolidayService],
  exports: [HolidayService]
})
export class HolidayModule { }
