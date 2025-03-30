import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class TrackingHistory {
  @Prop({ required: true })
  status: string;

  @Prop()
  location: string;

  @Prop({ default: Date.now })
  timestamp: Date;

  @Prop()
  note: string;
}

export const TrackingHistorySchema = SchemaFactory.createForClass(TrackingHistory);

@Schema({ timestamps: true })
export class Shipment extends Document {
  @Prop({ unique: true })
  shipmentId: string;

  @Prop({ type: Types.ObjectId, ref: 'Stores', required: true })
  storeId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Orders', required: true })
  orderId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Customers', required: true })
  customerId: Types.ObjectId;

  @Prop({
    enum: [
      'Giao hàng nhanh',
      'Giao hàng tiết kiệm',
      'Viettel Post',
      'Grab Express',
      'Tự giao',
    ],
    required: true,
  })
  shippingMethod: string;

  @Prop()
  trackingNumber: string;

  @Prop({ required: true })
  shippingFee: number;

  @Prop()
  estimatedDeliveryDate: Date;

  @Prop()
  actualDeliveryDate: Date;

  @Prop({
    type: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      ward: String,
      district: String,
      city: String,
      province: String,
      country: { type: String, default: 'Việt Nam' },
    },
  })
  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
    ward: string;
    district: string;
    city: string;
    province: string;
    country: string;
  };

  @Prop({
    enum: [
      'Chờ xử lý',
      'Đã nhận đơn',
      'Đang vận chuyển',
      'Đã giao hàng',
      'Giao hàng thất bại',
      'Đã hủy',
    ],
    default: 'Chờ xử lý',
  })
  status: string;

  @Prop({ type: [TrackingHistorySchema] })
  trackingHistory: TrackingHistory[];

  @Prop()
  notes: string;
}

export const ShipmentSchema = SchemaFactory.createForClass(Shipment);

ShipmentSchema.index({ storeId: 1 });
ShipmentSchema.index({ orderId: 1 });
ShipmentSchema.index({ customerId: 1 });
ShipmentSchema.index({ trackingNumber: 1 });