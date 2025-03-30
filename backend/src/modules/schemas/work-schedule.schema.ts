import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type WorkScheduleDocument = WorkSchedule & Document;

@Schema({ timestamps: true })
export class WorkSchedule {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Store', required: true })
  storeId: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Employee', required: true })
  employeeId: MongooseSchema.Types.ObjectId;

  @Prop({
    monday: {
      isWorking: { type: Boolean, default: true },
      startTime: String,
      endTime: String,
      breakTime: String
    },
    tuesday: {
      isWorking: { type: Boolean, default: true },
      startTime: String,
      endTime: String,
      breakTime: String
    },
    wednesday: {
      isWorking: { type: Boolean, default: true },
      startTime: String,
      endTime: String,
      breakTime: String
    },
    thursday: {
      isWorking: { type: Boolean, default: true },
      startTime: String,
      endTime: String,
      breakTime: String
    },
    friday: {
      isWorking: { type: Boolean, default: true },
      startTime: String,
      endTime: String,
      breakTime: String
    },
    saturday: {
      isWorking: { type: Boolean, default: false },
      startTime: String,
      endTime: String,
      breakTime: String
    },
    sunday: {
      isWorking: { type: Boolean, default: false },
      startTime: String,
      endTime: String,
      breakTime: String
    }
  })
  weeklySchedule: {
    monday: {
      isWorking: boolean;
      startTime: string;
      endTime: string;
      breakTime: string;
    };
    tuesday: {
      isWorking: boolean;
      startTime: string;
      endTime: string;
      breakTime: string;
    };
    wednesday: {
      isWorking: boolean;
      startTime: string;
      endTime: string;
      breakTime: string;
    };
    thursday: {
      isWorking: boolean;
      startTime: string;
      endTime: string;
      breakTime: string;
    };
    friday: {
      isWorking: boolean;
      startTime: string;
      endTime: string;
      breakTime: string;
    };
    saturday: {
      isWorking: boolean;
      startTime: string;
      endTime: string;
      breakTime: string;
    };
    sunday: {
      isWorking: boolean;
      startTime: string;
      endTime: string;
      breakTime: string;
    };
  };

  @Prop([{
    date: Date,
    isWorking: Boolean,
    startTime: String,
    endTime: String,
    breakTime: String,
    reason: String
  }])
  specialSchedules: Array<{
    date: Date;
    isWorking: boolean;
    startTime: string;
    endTime: string;
    breakTime: string;
    reason: string;
  }>;

  @Prop({
    allowed: { type: Boolean, default: true },
    maxHoursPerWeek: { type: Number, default: 40 },
    rate: { type: Number, default: 1.5 }
  })
  overtimeSettings: {
    allowed: boolean;
    maxHoursPerWeek: number;
    rate: number;
  };

  @Prop({
    annualLeave: { type: Number, default: 12 },
    sickLeave: { type: Number, default: 5 },
    maternityLeave: { type: Number, default: 180 }
  })
  leaveSettings: {
    annualLeave: number;
    sickLeave: number;
    maternityLeave: number;
  };

  @Prop({
    type: String,
    enum: ['Đang hoạt động', 'Tạm ngưng', 'Đã hủy'],
    default: 'Đang hoạt động'
  })
  status: string;

  @Prop()
  notes: string;
}

export const WorkScheduleSchema = SchemaFactory.createForClass(WorkSchedule);

// Add indexes
WorkScheduleSchema.index({ storeId: 1 });
WorkScheduleSchema.index({ employeeId: 1 });
WorkScheduleSchema.index({ 'specialSchedules.date': 1 });