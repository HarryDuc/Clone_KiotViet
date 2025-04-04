import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'CustomerGroups' })
export class CustomerGroup extends Document {
  @Prop({ unique: true, required: true })
  groupId: string; // Mã nhóm khách hàng

  @Prop({ required: true })
  name: string; // Tên nhóm

  @Prop({ enum: ['VND', '%'], required: true })
  discountType: string; // Loại chiết khấu

  @Prop({ required: true })
  discountValue: number; // Giá trị chiết khấu

  @Prop()
  description: string; // Mô tả

  @Prop({ default: Date.now })
  createdAt: Date; // Thời gian tạo
}

export const CustomerGroupSchema = SchemaFactory.createForClass(CustomerGroup);