import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'CommissionSettings' })
export class CommissionSetting extends Document {
  @Prop({ unique: true, required: true })
  commissionId: string; // Mã thiết lập hoa hồng

  @Prop({ required: true })
  name: string; // Tên thiết lập

  @Prop({ enum: ['global', 'branch'], required: true })
  scope: string; // Phạm vi áp dụng

  @Prop({ type: Types.ObjectId, ref: 'Branches' })
  branchId: Types.ObjectId; // Mã chi nhánh

  @Prop({ enum: ['active', 'inactive'], default: 'active' })
  status: string; // Trạng thái

  @Prop({ type: [{ productId: Types.ObjectId, rate: Number }] })
  details: { productId: Types.ObjectId; rate: number }[]; // Chi tiết hoa hồng

  @Prop({ default: Date.now })
  createdAt: Date; // Thời gian tạo
}

export const CommissionSettingSchema = SchemaFactory.createForClass(CommissionSetting);