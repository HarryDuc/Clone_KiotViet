import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Branch } from './branch.schema';
import { User } from './user.schema';

export type CashBookDocument = CashBook & Document;

@Schema({ timestamps: true })
export class CashBook {
  @Prop({ required: true })
  code: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Branch', required: true })
  branch: Branch;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  createdBy: User;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true, enum: ['income', 'expense'] })
  type: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  description: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Account' })
  account: MongooseSchema.Types.ObjectId;

  @Prop({ type: String })
  reference: string;

  @Prop({ type: Object })
  metadata: {
    category?: string;
    paymentMethod?: string;
    attachments?: string[];
  };

  @Prop({ default: 'pending', enum: ['pending', 'approved', 'rejected'] })
  status: string;

  @Prop()
  note: string;
}

export const CashBookSchema = SchemaFactory.createForClass(CashBook);