import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'Shipments' })
export class Shipment extends Document {
  @Prop({ unique: true, required: true })
  shipmentId: string; // Mã vận chuyển, định danh duy nhất

  @Prop({ type: Types.ObjectId, ref: 'Stores', required: true })
  storeId: Types.ObjectId; // Mã cửa hàng, liên kết đến bảng Stores

  @Prop({ type: Types.ObjectId, ref: 'Orders', required: true })
  orderId: Types.ObjectId; // Mã đơn hàng, liên kết đến bảng Orders

  @Prop({ type: Types.ObjectId, ref: 'Customers', required: true })
  customerId: Types.ObjectId; // Mã khách hàng, liên kết đến bảng Customers

  @Prop({ required: true })
  shippingAddress: string; // Địa chỉ giao hàng

  @Prop({ enum: ['pending', 'shipped', 'delivered', 'cancelled'], default: 'pending' })
  status: string; // Trạng thái: đang chờ, đã giao, hoàn thành, hủy

  @Prop({ default: Date.now })
  createdAt: Date; // Thời gian tạo bản ghi
}

export const ShipmentSchema = SchemaFactory.createForClass(Shipment);