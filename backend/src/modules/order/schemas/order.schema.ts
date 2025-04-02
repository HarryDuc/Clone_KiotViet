import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'OrderProducts' })
export class OrderProduct {
  @Prop({ type: Types.ObjectId, ref: 'Products' })
  productId: Types.ObjectId;

  @Prop()
  quantity: number;

  @Prop()
  price: number;

  @Prop({ default: 0 })
  discount: number;
}

export const OrderProductSchema = SchemaFactory.createForClass(OrderProduct);

@Schema({ timestamps: true, collection: 'Orders' })
export class Order extends Document {
  @Prop({ unique: true, required: true })
  orderId: string;

  @Prop({ unique: true })
  orderCode: string;

  @Prop({ type: Types.ObjectId, ref: 'Customers' })
  customerId: Types.ObjectId;

  @Prop({ type: [OrderProductSchema] })
  products: OrderProduct[];

  @Prop()
  totalAmount: number;

  @Prop({ default: 0 })
  discount: number;

  @Prop({ enum: ['Tiền mặt', 'Chuyển khoản', 'Thẻ', 'Ví'] })
  paymentMethod: string;

  @Prop({
    enum: [
      'Phiếu tạm thời',
      'Đã xác nhận',
      'Đang giao hàng',
      'Hoàn thành',
      'Đã hủy',
    ],
    default: 'Phiếu tạm thời',
  })
  status: string;

  @Prop({ type: Types.ObjectId })
  channel: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Carriers' })
  carrierId: Types.ObjectId;

  @Prop()
  deliveryDate: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);