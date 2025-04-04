import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'ReturnPurchases' })
export class ReturnPurchase extends Document {
  @Prop({ unique: true, required: true })
  returnPurchaseId: string; // Mã trả hàng

  @Prop({ type: Types.ObjectId, ref: 'PurchaseOrders', required: true })
  purchaseOrderId: Types.ObjectId; // Mã đơn đặt hàng

  @Prop({ type: [{ productId: Types.ObjectId, quantity: Number }] })
  products: { productId: Types.ObjectId; quantity: number }[]; // Sản phẩm trả

  @Prop({ required: true })
  totalAmount: number; // Tổng tiền trả

  @Prop({ enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' })
  status: string; // Trạng thái

  @Prop({ default: Date.now })
  createdAt: Date; // Thời gian tạo
}

export const ReturnPurchaseSchema = SchemaFactory.createForClass(ReturnPurchase);