import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Branch } from './branch.schema';
import { Customer } from './customer.schema';
import { User } from './user.schema';
import { Product } from './product.schema';

export type TransactionDocument = Transaction & Document;

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ required: true })
  code: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Branch', required: true })
  branch: Branch;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Customer', required: true })
  customer: Customer;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  createdBy: User;

  @Prop({ type: Object })
  items: Array<{
    product: MongooseSchema.Types.ObjectId;
    quantity: number;
    unitPrice: number;
    discount: number;
    tax: number;
    total: number;
  }>;

  @Prop({ type: Object })
  totals: {
    subtotal: number;
    discount: number;
    tax: number;
    shipping: number;
    total: number;
  };

  @Prop({ type: Object })
  payment: {
    method: string;
    status: string;
    amount: number;
    currency: string;
    transactionId?: string;
    paymentDate?: Date;
  };

  @Prop({ type: Object })
  shipping: {
    method: string;
    carrier?: string;
    trackingNumber?: string;
    address: {
      street: string;
      city: string;
      state: string;
      country: string;
      zipCode: string;
    };
    status: string;
    estimatedDelivery?: Date;
  };

  @Prop({ type: Object })
  status: {
    current: string;
    history: Array<{
      status: string;
      note?: string;
      updatedBy: MongooseSchema.Types.ObjectId;
      updatedAt: Date;
    }>;
  };

  @Prop({ type: Object })
  metadata: {
    source: string;
    reference?: string;
    tags: string[];
    notes: string[];
  };

  @Prop()
  note: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);