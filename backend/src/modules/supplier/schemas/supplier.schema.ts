import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'Suppliers' })
export class Supplier extends Document {
  @Prop({ unique: true, required: true })
  supplierId: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  address: string;

  @Prop({ type: Types.ObjectId, ref: 'SupplierGroups' })
  group: Types.ObjectId;

  @Prop({ enum: ['active', 'inactive'], default: 'active' })
  status: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  // Trường mới
  @Prop({ type: [Types.ObjectId], ref: 'Products' })
  products: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'Transactions' })
  transactionHistory: Types.ObjectId[];
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);