import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'Carriers' })
export class Carrier extends Document {
  @Prop({ unique: true, required: true })
  carrierId: string; // Mã đơn vị vận chuyển

  @Prop({ required: true })
  name: string; // Tên đơn vị vận chuyển

  @Prop()
  phone: string; // Số điện thoại

  @Prop()
  email: string; // Email

  @Prop()
  address: string; // Địa chỉ

  @Prop({ type: Types.ObjectId, ref: 'CarrierGroups' })
  group: Types.ObjectId; // Mã nhóm đơn vị vận chuyển

  @Prop({ default: 0 })
  totalOrders: number; // Tổng số đơn hàng

  @Prop({ default: 0 })
  totalFees: number; // Tổng phí vận chuyển

  @Prop({ enum: ['active', 'inactive'], default: 'active' })
  status: string; // Trạng thái

  @Prop({ default: Date.now })
  createdAt: Date; // Thời gian tạo

  @Prop({ default: Date.now })
  updatedAt: Date; // Thời gian cập nhật
}

export const CarrierSchema = SchemaFactory.createForClass(Carrier);