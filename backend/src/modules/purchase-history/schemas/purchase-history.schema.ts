import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'PurchaseHistories' })
export class PurchaseHistory extends Document {
  @Prop({ unique: true, required: true })
  purchaseHistoryId: string; // Mã lịch sử mua hàng

  @Prop({ type: Types.ObjectId, ref: 'Stores', required: true })
  storeId: Types.ObjectId; // Mã cửa hàng

  @Prop({ type: Types.ObjectId, ref: 'ServicePackages', required: true })
  packageId: Types.ObjectId; // Mã gói dịch vụ

  @Prop({ required: true })
  purchaseDate: Date; // Ngày mua

  @Prop({ required: true })
  amount: number; // Số tiền

  @Prop({ enum: ['paid', 'pending', 'cancelled'], default: 'pending' })
  status: string; // Trạng thái

  @Prop()
  paymentMethod: string; // Phương thức thanh toán

  @Prop({ default: Date.now })
  createdAt: Date; // Thời gian tạo
}
export const PurchaseHistorySchema = SchemaFactory.createForClass(PurchaseHistory);