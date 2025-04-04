import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkScheduleController } from '../work-schedule/controllers/work-schedule.controller';
import { WorkScheduleService } from '../services/work-schedule.service';
import { WorkSchedule, WorkScheduleSchema } from '../work-schedule/work-schedule.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WorkSchedule.name, schema: WorkScheduleSchema }
    ])
  ],
  controllers: [WorkScheduleController],
  providers: [WorkScheduleService],
  exports: [WorkScheduleService]
})
export class WorkScheduleModule { }