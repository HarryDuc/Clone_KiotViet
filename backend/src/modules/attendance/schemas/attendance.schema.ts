import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'Attendances' })
export class Attendance extends Document {
  @Prop({ unique: true, required: true })
  attendanceId: string;

  @Prop({ type: Types.ObjectId, ref: 'Employees', required: true })
  employeeId: Types.ObjectId;

  @Prop({ required: true })
  date: Date;

  @Prop()
  checkIn: Date;

  @Prop()
  checkOut: Date;

  @Prop({ enum: ['Đúng giờ', 'Đi muộn', 'Về sớm', 'Chưa chấm công', 'Nghỉ làm'], default: 'Chưa chấm công' })
  status: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  absenceReason?: string;

  // Trường mới
  @Prop({ default: 0 })
  overtimeHours: number; // Số giờ làm thêm

  @Prop({ default: 0 })
  lateMinutes: number; // Số phút đi muộn
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);