import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class WeeklyScheduleDay {
  @Prop({ default: true })
  isWorking: boolean;

  @Prop()
  startTime: string;

  @Prop()
  endTime: string;

  @Prop()
  breakTime: string;
}

export const WeeklyScheduleDaySchema = SchemaFactory.createForClass(WeeklyScheduleDay);

@Schema()
export class SpecialSchedule {
  @Prop()
  date: Date;

  @Prop()
  isWorking: boolean;

  @Prop()
  startTime: string;

  @Prop()
  endTime: string;

  @Prop()
  breakTime: string;

  @Prop()
  reason: string;
}

export const SpecialScheduleSchema = SchemaFactory.createForClass(SpecialSchedule);

@Schema({ timestamps: true })
export class WorkSchedule extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Stores', required: true })
  storeId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Employees', required: true })
  employeeId: Types.ObjectId;

  @Prop({
    type: {
      monday: WeeklyScheduleDaySchema,
      tuesday: WeeklyScheduleDaySchema,
      wednesday: WeeklyScheduleDaySchema,
      thursday: WeeklyScheduleDaySchema,
      friday: WeeklyScheduleDaySchema,
      saturday: WeeklyScheduleDaySchema,
      sunday: WeeklyScheduleDaySchema,
    },
  })
  weeklySchedule: {
    monday: WeeklyScheduleDay;
    tuesday: WeeklyScheduleDay;
    wednesday: WeeklyScheduleDay;
    thursday: WeeklyScheduleDay;
    friday: WeeklyScheduleDay;
    saturday: WeeklyScheduleDay;
    sunday: WeeklyScheduleDay;
  };

  @Prop({ type: [SpecialScheduleSchema] })
  specialSchedules: SpecialSchedule[];

  @Prop({
    type: {
      allowed: { type: Boolean, default: true },
      maxHoursPerWeek: { type: Number, default: 40 },
      rate: { type: Number, default: 1.5 },
    },
  })
  overtimeSettings: {
    allowed: boolean;
    maxHoursPerWeek: number;
    rate: number;
  };

  @Prop({
    type: {
      annualLeave: { type: Number, default: 12 },
      sickLeave: { type: Number, default: 5 },
      maternityLeave: { type: Number, default: 180 },
    },
  })
  leaveSettings: {
    annualLeave: number;
    sickLeave: number;
    maternityLeave: number;
  };

  @Prop({ enum: ['Đang hoạt động', 'Tạm ngưng', 'Đã hủy'], default: 'Đang hoạt động' })
  status: string;

  @Prop()
  notes: string;
}

export const WorkScheduleSchema = SchemaFactory.createForClass(WorkSchedule);

WorkScheduleSchema.index({ storeId: 1 });
WorkScheduleSchema.index({ employeeId: 1 });
WorkScheduleSchema.index({ 'specialSchedules.date': 1 });