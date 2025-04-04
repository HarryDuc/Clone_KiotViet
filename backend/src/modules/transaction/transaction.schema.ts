import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Transaction extends Document {
  @Prop({ unique: true })
  transactionId: string;

  @Prop({ type: Types.ObjectId, ref: 'Stores' })
  storeId: Types.ObjectId;

  @Prop({ enum: ['Nạp tiền', 'Chi tiêu'] })
  type: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ default: Date.now })
  date: Date;

  @Prop()
  description: string;

  @Prop()
  balanceBefore: number;

  @Prop()
  balanceAfter: number;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);