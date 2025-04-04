import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'Customers' })
export class Customer extends Document {
  @Prop({ unique: true, required: true })
  customerId: string; // Mã khách hàng

  @Prop({ required: true })
  name: string; // Tên khách hàng

  @Prop()
  phone: string; // Số điện thoại

  @Prop()
  email: string; // Email

  @Prop()
  address: string; // Địa chỉ

  @Prop({ enum: ['individual', 'company'], required: true })
  customerType: string; // Loại khách hàng

  @Prop()
  taxCode: string; // Mã số thuế

  @Prop()
  idCard: string; // CMND/CCCD

  @Prop({ type: Types.ObjectId, ref: 'CustomerGroups' })
  group: Types.ObjectId; // Mã nhóm khách hàng

  @Prop({ default: 0 })
  debt: number; // Nợ hiện tại

  @Prop({ default: 0 })
  totalSales: number; // Tổng doanh số

  @Prop({ enum: ['active', 'inactive'], default: 'active' })
  status: string; // Trạng thái

  @Prop({ default: Date.now })
  createdAt: Date; // Thời gian tạo
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);