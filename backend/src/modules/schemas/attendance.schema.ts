import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Attendance extends Document {
  @Prop({ unique: true })
  attendanceId: string  ;

  @Prop({ type: Types.ObjectId, ref: 'Employees' })
  employeeId: Types.ObjectId;

  @Prop()
  date: Date;

  @Prop()
  checkIn: Date;

  @Prop()
  checkOut: Date;

  @Prop({
    enum: ['Đúng giờ', 'Đi muộn', 'Về sớm', 'Chưa chấm công', 'Nghỉ làm'],
  })
  status: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
