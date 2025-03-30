import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Branch } from './branch.schema';
import { User } from './user.schema';

export type HolidayDocument = Holiday & Document;

@Schema({ timestamps: true })
export class Holiday {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Branch', required: true })
  branch: Branch;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  createdBy: User;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ type: Object })
  settings: {
    isRecurring: boolean;
    recurrencePattern?: {
      frequency: string;
      interval: number;
      daysOfWeek?: number[];
      daysOfMonth?: number[];
    };
    isPaid: boolean;
    isHalfDay: boolean;
    halfDayType?: 'morning' | 'afternoon';
  };

  @Prop({ type: Object })
  compensation: {
    type: string;
    amount?: number;
    description?: string;
  };

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Department' }] })
  applicableDepartments: MongooseSchema.Types.ObjectId[];

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Employee' }] })
  applicableEmployees: MongooseSchema.Types.ObjectId[];

  @Prop({ default: 'active', enum: ['active', 'inactive', 'cancelled'] })
  status: string;

  @Prop({ type: Object })
  metadata: {
    category: string;
    priority: string;
    tags: string[];
    notes: string[];
  };

  @Prop()
  note: string;
}

export const HolidaySchema = SchemaFactory.createForClass(Holiday);