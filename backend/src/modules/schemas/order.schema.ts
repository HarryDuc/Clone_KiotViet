import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
class OrderProduct {
  @Prop({ type: Types.ObjectId, ref: 'Product' })
  productId: Types.ObjectId;

  @Prop()
  quantity: number;

  @Prop()
  price: number;

  @Prop({ default: 0 })
  discount: number;
}

@Schema()
export class Order {
  @Prop({ unique: true })
  orderId: string;

  @Prop({ unique: true })
  orderCode: string;

  @Prop({ type: Types.ObjectId, ref: 'Customer' })
  customerId: Types.ObjectId;

  @Prop({ type: [OrderProduct] })
  products: OrderProduct[];

  @Prop()
  totalAmount: number;

  @Prop({ default: 0 })
  discount: number;

  @Prop({ enum: ['Tiền mặt', 'Chuyển khoản', 'Thẻ', 'Ví'] })
  paymentMethod: string;

  @Prop({
    enum: ['Phiếu tạm thời', 'Đã xác nhận', 'Đang giao hàng', 'Hoàn thành', 'Đã hủy'],
    default: 'Phiếu tạm thời'
  })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'SalesChannel' })
  channel: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Carrier' })
  carrierId: Types.ObjectId;

  @Prop()
  deliveryDate: Date;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);