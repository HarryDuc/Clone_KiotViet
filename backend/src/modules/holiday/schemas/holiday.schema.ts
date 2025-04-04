import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'Holidays' })
export class Holiday extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Stores', required: true })
  storeId: Types.ObjectId; // Mã cửa hàng

  @Prop({ required: true })
  name: string; // Tên ngày lễ

  @Prop({ enum: ['holiday', 'special', 'company'], required: true })
  type: string; // Loại ngày lễ

  @Prop({ required: true })
  startDate: Date; // Ngày bắt đầu

  @Prop({ required: true })
  endDate: Date; // Ngày kết thúc

  @Prop()
  duration: number; // Thời gian (ngày)

  @Prop()
  description: string; // Mô tả

  @Prop({ default: false })
  isRecurring: boolean; // Lặp lại hàng năm

  @Prop({ type: { frequency: String, interval: Number, endAfter: Date } })
  recurringPattern: {
    frequency: string; // Tần suất lặp
    interval: number; // Khoảng cách
    endAfter: Date; // Kết thúc sau
  };

  @Prop({ enum: ['active', 'inactive'], default: 'active' })
  status: string; // Trạng thái
}

export const HolidaySchema = SchemaFactory.createForClass(Holiday);