import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'Customers' })
export class Customer extends Document {
  @Prop({ unique: true, required: true })
  customerId: string; // Mã khách hàng duy nhất

  @Prop({ required: true })
  name: string; // Tên khách hàng

  @Prop()
  phone: string; // Số điện thoại liên hệ

  @Prop()
  email: string; // Email liên hệ

  @Prop()
  address: string; // Địa chỉ

  @Prop({ enum: ['Cá nhân', 'Công ty'] })
  customerType: string; // Loại khách hàng: Cá nhân hoặc Công ty

  @Prop()
  taxCode: string; // Mã số thuế (cho khách hàng công ty)

  @Prop()
  idCard: string; // Số CMND/CCCD (cho khách hàng cá nhân)

  @Prop({ type: Types.ObjectId, ref: 'CustomerGroups' })
  group: Types.ObjectId; // Liên kết với nhóm khách hàng

  @Prop({ default: 0 })
  debt: number; // Số tiền nợ hiện tại

  @Prop({ default: 0 })
  totalSales: number; // Tổng doanh số mua hàng

  @Prop({ enum: ['Đang hoạt động', 'Ngừng hoạt động'], default: 'Đang hoạt động' })
  status: string; // Trạng thái hoạt động của khách hàng

  @Prop({ default: Date.now })
  createdAt: Date; // Ngày tạo khách hàng
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);