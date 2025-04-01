import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class PurchaseHistory extends Document {
  @Prop({ unique: true })
  purchaseId: string;

  @Prop({ type: Types.ObjectId, ref: 'Stores' })
  storeId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'ServicePackages' })
  packageId: Types.ObjectId;

  @Prop({ default: Date.now })
  purchaseDate: Date;

  @Prop()
  duration: number;

  @Prop()
  totalAmount: number;

  @Prop({
    enum: ['Hoàn thành', 'Đang xử lý', 'Hủy'],
    default: 'Hoàn thành',
  })
  status: string;
}

export const PurchaseHistorySchema = SchemaFactory.createForClass(PurchaseHistory);
