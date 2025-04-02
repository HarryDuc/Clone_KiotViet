import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'Carriers' })
export class Carrier extends Document {
  @Prop({ unique: true, required: true })
  carrierId: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  address: string;

  @Prop({ type: Types.ObjectId, ref: 'CarrierGroups' })
  group: Types.ObjectId;

  @Prop({ default: 0 })
  totalOrders: number;

  @Prop({ default: 0 })
  totalFees: number;

  @Prop({ enum: ['Đang hoạt động', 'Ngừng hoạt động'], default: 'Đang hoạt động' })
  status: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updateAt: Date;
}

export const CarrierSchema = SchemaFactory.createForClass(Carrier);