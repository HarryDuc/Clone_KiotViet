import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'PurchaseOrders' })
export class PurchaseOrder extends Document {
  @Prop({ unique: true, required: true })
  purchaseOrderId: string; // Mã đơn đặt hàng

  @Prop({ type: Types.ObjectId, ref: 'Suppliers', required: true })
  supplierId: Types.ObjectId; // Mã nhà cung cấp

  @Prop({ type: [{ productId: Types.ObjectId, quantity: Number, price: Number }] })
  products: { productId: Types.ObjectId; quantity: number; price: number }[]; // Sản phẩm

  @Prop({ required: true })
  totalAmount: number; // Tổng tiền

  @Prop({ enum: ['pending', 'confirmed', 'shipping', 'completed', 'cancelled'], default: 'pending' })
  status: string; // Trạng thái

  @Prop({ default: Date.now })
  createdAt: Date; // Thời gian tạo
}

export const PurchaseOrderSchema = SchemaFactory.createForClass(PurchaseOrder);