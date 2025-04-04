import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'ServicePackages' })
export class ServicePackage extends Document {
  @Prop({ unique: true, required: true })
  packageId: string; // Mã gói dịch vụ, định danh duy nhất

  @Prop({ required: true })
  name: string; // Tên gói dịch vụ

  @Prop()
  description: string; // Mô tả gói dịch vụ

  @Prop({ required: true })
  price: number; // Giá của gói dịch vụ

  @Prop({ enum: ['monthly', 'yearly', 'lifetime'], required: true })
  type: string; // Loại gói: hàng tháng, hàng năm, trọn đời

  @Prop({ enum: ['active', 'inactive'], default: 'active' })
  status: string; // Trạng thái: hoạt động hoặc không hoạt động

  @Prop({ default: Date.now })
  createdAt: Date; // Thời gian tạo bản ghi
}

export const ServicePackageSchema = SchemaFactory.createForClass(ServicePackage);