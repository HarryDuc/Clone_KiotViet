import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CustomerDocument = Customer & Document;

@Schema()
export class Customer {
  @Prop({ unique: true })
  customerId: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  address: string;

  @Prop({ enum: ['Cá nhân', 'Công ty'] })
  customerType: string;

  @Prop()
  taxCode: string;

  @Prop()
  idCard: string;

  @Prop({ type: Types.ObjectId, ref: 'CustomerGroup' })
  group: Types.ObjectId;

  @Prop({ default: 0 })
  debt: number;

  @Prop({ default: 0 })
  totalSales: number;

  @Prop({ enum: ['Đang hoạt động', 'Ngừng hoạt động'], default: 'Đang hoạt động' })
  status: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);