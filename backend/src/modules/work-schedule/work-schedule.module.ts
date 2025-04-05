import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkScheduleController } from './controllers/work-schedule.controller';
import { WorkScheduleService } from './services/work-schedule.service';
import { WorkSchedule, WorkScheduleSchema } from './schemas/work-schedule.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'WorkSchedules', schema: WorkScheduleSchema }
    ])
  ],
  controllers: [WorkScheduleController],
  providers: [WorkScheduleService],
  exports: [WorkScheduleService]
})
export class WorkScheduleModule { }