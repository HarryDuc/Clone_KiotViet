import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Holiday extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Stores', required: true })
  storeId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ enum: ['Ngày lễ', 'Ngày đặc biệt', 'Sự kiện của công ty'], required: true })
  type: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop()
  duration: number;

  @Prop()
  description: string;

  @Prop({ default: false })
  isRecurring: boolean;

  @Prop({
    type: {
      frequency: { type: String, enum: ['Hàng năm', 'Hàng tháng', 'Hàng tuần'] },
      interval: Number,
      endAfter: Date,
    },
  })
  recurringPattern: {
    frequency: string;
    interval: number;
    endAfter: Date;
  };

  @Prop({ enum: ['Đang hoạt động', 'Ngừng hoạt động'], default: 'Đang hoạt động' })
  status: string;
}

export const HolidaySchema = SchemaFactory.createForClass(Holiday);

HolidaySchema.index({ storeId: 1 });
HolidaySchema.index({ startDate: 1 });
HolidaySchema.index({ endDate: 1 });
HolidaySchema.index({ type: 1 });
HolidaySchema.index({ status: 1 });