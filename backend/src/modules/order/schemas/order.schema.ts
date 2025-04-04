import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'OrderProducts' })
export class OrderProduct {
  @Prop({ type: Types.ObjectId, ref: 'Products' })
  productId: Types.ObjectId; // Liên kết với sản phẩm

  @Prop()
  quantity: number; // Số lượng sản phẩm

  @Prop()
  price: number; // Giá bán tại thời điểm đặt hàng

  @Prop({ default: 0 })
  discount: number; // Chiết khấu cho sản phẩm
}

export const OrderProductSchema = SchemaFactory.createForClass(OrderProduct);

@Schema({ timestamps: true, collection: 'Orders' })
export class Order extends Document {
  @Prop({ unique: true, required: true })
  orderId: string; // Mã đơn hàng duy nhất

  @Prop({ unique: true })
  orderCode: string; // Mã đơn hàng hiển thị

  @Prop({ type: Types.ObjectId, ref: 'Customers' })
  customerId: Types.ObjectId; // Liên kết với khách hàng

  @Prop({ type: [OrderProductSchema] })
  products: OrderProduct[]; // Danh sách sản phẩm trong đơn hàng

  @Prop()
  totalAmount: number; // Tổng tiền đơn hàng

  @Prop({ default: 0 })
  discount: number; // Chiết khấu tổng đơn hàng

  @Prop({ enum: ['Tiền mặt', 'Chuyển khoản', 'Thẻ', 'Ví'] })
  paymentMethod: string; // Phương thức thanh toán

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
  status: string; // Trạng thái đơn hàng

  @Prop({ type: Types.ObjectId, ref: 'SalesChannels' })
  channel: Types.ObjectId; // Kênh bán hàng

  @Prop({ type: Types.ObjectId, ref: 'Carriers' })
  carrierId: Types.ObjectId; // Đơn vị vận chuyển

  @Prop()
  deliveryDate: Date; // Ngày giao hàng dự kiến
}

export const OrderSchema = SchemaFactory.createForClass(Order);