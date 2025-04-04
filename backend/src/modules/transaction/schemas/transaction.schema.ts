import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'Transactions' })
export class Transaction extends Document {
  @Prop({ unique: true, required: true })
  transactionId: string;

  @Prop({ type: Types.ObjectId, ref: 'Stores', required: true })
  storeId: Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({ enum: ['payment', 'refund', 'transfer'], required: true })
  type: string;

  @Prop({ enum: ['pending', 'completed', 'failed'], default: 'pending' })
  status: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  // Trường mới
  @Prop({ type: [{ productId: Types.ObjectId, quantity: Number }] })
  details: { productId: Types.ObjectId; quantity: number }[];

  @Prop({ type: Types.ObjectId, ref: 'Employees' })
  accountId: Types.ObjectId;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);