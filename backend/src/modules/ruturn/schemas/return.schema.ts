import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'Returns' })
export class Return extends Document {
  @Prop({ unique: true, required: true })
  returnId: string; // Mã trả hàng

  @Prop({ type: Types.ObjectId, ref: 'Orders', required: true })
  orderId: Types.ObjectId; // Mã đơn hàng

  @Prop({ type: [{ productId: Types.ObjectId, quantity: Number }] })
  products: { productId: Types.ObjectId; quantity: number }[]; // Sản phẩm trả

  @Prop({ required: true })
  totalAmount: number; // Tổng tiền trả

  @Prop({ enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' })
  status: string; // Trạng thái

  @Prop({ default: Date.now })
  createdAt: Date; // Thời gian tạo
}

export const ReturnSchema = SchemaFactory.createForClass(Return);