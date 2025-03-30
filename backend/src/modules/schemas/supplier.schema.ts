import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SupplierDocument = Supplier & Document;

@Schema()
export class Supplier {
  @Prop({ unique: true })
  supplierId: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  address: string;

  @Prop({ type: Types.ObjectId, ref: 'SupplierGroup' })
  group: Types.ObjectId;

  @Prop({ default: 0 })
  debt: number;

  @Prop({ default: 0 })
  totalPurchases: number;

  @Prop({ enum: ['Đang hoạt động', 'Ngừng hoạt động'], default: 'Đang hoạt động' })
  status: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);