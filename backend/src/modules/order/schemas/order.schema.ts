import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'Orders' })
export class Order extends Document {
  @Prop({ unique: true, required: true })
  orderId: string; // Mã đơn hàng

  @Prop({ unique: true, required: true })
  orderCode: string; // Mã đơn hàng hiển thị

  @Prop({ type: Types.ObjectId, ref: 'Customers', required: true })
  customerId: Types.ObjectId; // Mã khách hàng

  @Prop({ type: [{ productId: Types.ObjectId, quantity: Number, price: Number, discount: Number }] })
  products: { productId: Types.ObjectId; quantity: number; price: number; discount: number }[]; // Sản phẩm

  @Prop({ required: true })
  totalAmount: number; // Tổng tiền

  @Prop({ default: 0 })
  discount: number; // Chiết khấu

  @Prop({ enum: ['cash', 'bank_transfer', 'card', 'wallet'] })
  paymentMethod: string; // Phương thức thanh toán

  @Prop({ enum: ['pending', 'confirmed', 'shipping', 'completed', 'cancelled'], default: 'pending' })
  status: string; // Trạng thái

  @Prop({ type: Types.ObjectId, ref: 'SalesChannels' })
  channel: Types.ObjectId; // Mã kênh bán hàng

  @Prop({ type: Types.ObjectId, ref: 'Carriers' })
  carrierId: Types.ObjectId; // Mã đơn vị vận chuyển

  @Prop()
  deliveryDate: Date; // Ngày giao hàng
}

export const OrderSchema = SchemaFactory.createForClass(Order);