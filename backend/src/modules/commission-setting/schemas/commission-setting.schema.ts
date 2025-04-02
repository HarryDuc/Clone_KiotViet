import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'CommissionDetails' })
export class CommissionDetail {
  @Prop({ type: Types.ObjectId, ref: 'Products' })
  productId: Types.ObjectId;

  @Prop()
  rate: number;
}

export const CommissionDetailSchema = SchemaFactory.createForClass(CommissionDetail);

@Schema({ collection: 'CommissionSettings' })
export class CommissionSetting extends Document {
  @Prop({ unique: true, required: true })
  commissionId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ enum: ['Toàn hệ thống', 'Chi nhánh'] })
  scope: string;

  @Prop({ type: Types.ObjectId, ref: 'Branches' })
  branchId: Types.ObjectId;

  @Prop({ enum: ['Áp dụng', 'Ngừng áp dụng'], default: 'Áp dụng' })
  status: string;

  @Prop({ type: [CommissionDetailSchema] })
  details: CommissionDetail[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const CommissionSettingSchema = SchemaFactory.createForClass(CommissionSetting);