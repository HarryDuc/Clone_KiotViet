import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'WorkSchedules' })
export class WorkSchedule extends Document {
  @Prop({ unique: true, required: true })
  scheduleId: string;

  @Prop({ type: Types.ObjectId, ref: 'Stores', required: true })
  storeId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Employees', required: true })
  employeeId: Types.ObjectId;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  startTime: Date;

  @Prop({ required: true })
  endTime: Date;

  @Prop({ required: true })
  shiftName: string;

  @Prop({ enum: ['scheduled', 'completed', 'missed'], default: 'scheduled' })
  status: string;

  @Prop({ default: false })
  isHoliday: boolean;

  @Prop({ type: { repeat: Boolean, daysOfWeek: [String], endRepeat: Date } })
  repeatSettings: { repeat: boolean; daysOfWeek: string[]; endRepeat: Date };

  @Prop()
  notes: string;
  @Prop()
  shiftType: string;

  @Prop({ type: Types.ObjectId, ref: 'Attendances' })
  attendanceId: Types.ObjectId;
  
  @Prop({ default: Date.now })
  createdAt: Date;
}

export const WorkScheduleSchema = SchemaFactory.createForClass(WorkSchedule);