import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Customer } from './customer.schema';
import { LoyaltyProgram } from './loyalty-program.schema';
import { Transaction } from './transaction.schema';

export type CustomerLoyaltyPointsDocument = CustomerLoyaltyPoints & Document;

@Schema({ timestamps: true })
export class CustomerLoyaltyPoints {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Customer', required: true })
  customer: Customer;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'LoyaltyProgram', required: true })
  program: LoyaltyProgram;

  @Prop({ required: true, default: 0 })
  points: number;

  @Prop({ type: Object })
  tier: {
    name: string;
    pointsRequired: number;
    benefits: string[];
    discountRate: number;
  };

  @Prop({
    type: [{
      type: { type: String, enum: ['earn', 'spend', 'expire', 'adjust'] },
      points: Number,
      transaction: { type: MongooseSchema.Types.ObjectId, ref: 'Transaction', required: false },
      description: String,
      expiryDate: { type: Date, required: false },
      createdAt: { type: Date, default: Date.now }
    }]
  })
  history: Array<{
    type: string;
    points: number;
    transaction?: Transaction;
    description: string;
    expiryDate?: Date;
    createdAt: Date;
  }>;

  @Prop({ type: Object })
  statistics: {
    totalEarned: number;
    totalSpent: number;
    totalExpired: number;
    totalAdjusted: number;
    lastActivityDate: Date;
  };

  @Prop({ type: Object })
  metadata: {
    joinDate: Date;
    lastTierUpdate: Date;
    notes: string[];
  };

  @Prop()
  note: string;
}

export const CustomerLoyaltyPointsSchema = SchemaFactory.createForClass(CustomerLoyaltyPoints);
