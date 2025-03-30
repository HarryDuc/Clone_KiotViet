import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Branch } from './branch.schema';
import { User } from './user.schema';
import { Order } from './order.schema';
import { Carrier } from './carrier.schema';

export type ShipmentDocument = Shipment & Document;

@Schema({ timestamps: true })
export class Shipment {
  @Prop({ required: true })
  code: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Branch', required: true })
  branch: Branch;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  createdBy: User;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Order', required: true })
  order: Order;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Carrier', required: true })
  carrier: Carrier;

  @Prop({ required: true })
  shipDate: Date;

  @Prop({ required: true })
  estimatedDeliveryDate: Date;

  @Prop({ type: Object, required: true })
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    contactName: string;
    contactPhone: string;
  };

  @Prop({
    type: [{
      productId: { type: MongooseSchema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
      weight: Number,
      volume: Number
    }]
  })
  items: Array<{
    productId: MongooseSchema.Types.ObjectId;
    quantity: number;
    weight: number;
    volume: number;
  }>;

  @Prop({ required: true })
  totalWeight: number;

  @Prop({ required: true })
  totalVolume: number;

  @Prop({ required: true })
  shippingCost: number;

  @Prop({
    default: 'pending', enum: [
      'pending',
      'processing',
      'shipped',
      'in_transit',
      'delivered',
      'failed',
      'returned'
    ]
  })
  status: string;

  @Prop({ type: Object })
  tracking: {
    number: string;
    url: string;
    events: Array<{
      date: Date;
      location: string;
      status: string;
      description: string;
    }>;
  };

  @Prop()
  note: string;
}

export const ShipmentSchema = SchemaFactory.createForClass(Shipment);