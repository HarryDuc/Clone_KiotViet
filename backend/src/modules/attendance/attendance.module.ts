import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Attendance, AttendanceSchema } from './schemas/attendance.schema';
import { AttendanceService } from './services/attendance.service';
import { AttendanceController } from './controllers/attendance.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Attendances', schema: AttendanceSchema }]),
  ],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendanceModule {}