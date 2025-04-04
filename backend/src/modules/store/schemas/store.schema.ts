import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'Stores' })
export class Store extends Document {
  @Prop({ unique: true, required: true })
  storeId: string;

  @Prop({ required: true })
  name: string; // Tên cửa hàng

  @Prop({ required: true })
  phone: string; // Số điện thoại cửa hàng

  @Prop({ required: true })
  country: string; // Quốc gia

  @Prop({ required: true })
  region: string; // Khu vực

  @Prop({ required: true })
  businessIndustry: string; // Ngành hàng kinh doanh

  @Prop({ type: Types.ObjectId, ref: 'Users', required: true })
  managerId: Types.ObjectId; // Liên kết với tài khoản chính (Store Owner)

  @Prop({ enum: ['active', 'inactive'], default: 'active' })
  status: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  // Các trường tùy chọn khác (từ gợi ý trước)
  @Prop()
  address?: string;

  @Prop()
  email?: string;

  @Prop({ type: { timezone: String } })
  settings?: { timezone: string };

  @Prop({ type: Types.ObjectId, ref: 'ServicePackages' })
  servicePackage?: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'Branches' })
  branches?: Types.ObjectId[];

  @Prop([String])
  paymentMethods?: string[];
}

export const StoreSchema = SchemaFactory.createForClass(Store);