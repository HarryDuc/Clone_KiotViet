import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class PointsHistory {
  @Prop({ enum: ['Kiếm tiền', 'Quy đổi', 'Hết hạn', 'Điều chỉnh'], required: true })
  type: string;

  @Prop({ required: true })
  points: number;

  @Prop({ type: Types.ObjectId, ref: 'Orders' })
  orderId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'LoyaltyPrograms.rewards' })
  rewardId: Types.ObjectId;

  @Prop()
  description: string;

  @Prop()
  expiryDate: Date;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const PointsHistorySchema = SchemaFactory.createForClass(PointsHistory);

@Schema({ timestamps: true })
export class CustomerLoyaltyPoints extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Stores', required: true })
  storeId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Customers', required: true })
  customerId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'LoyaltyPrograms', required: true })
  programId: Types.ObjectId;

  @Prop({ default: 0 })
  currentPoints: number;

  @Prop({ default: 0 })
  totalPointsEarned: number;

  @Prop({ default: 0 })
  totalPointsRedeemed: number;

  @Prop()
  tier: string;

  @Prop({ type: [PointsHistorySchema] })
  pointsHistory: PointsHistory[];
}

export const CustomerLoyaltyPointsSchema = SchemaFactory.createForClass(CustomerLoyaltyPoints);

CustomerLoyaltyPointsSchema.index({ storeId: 1 });
CustomerLoyaltyPointsSchema.index({ customerId: 1 });
CustomerLoyaltyPointsSchema.index({ programId: 1 });
CustomerLoyaltyPointsSchema.index({ 'pointsHistory.type': 1 });
CustomerLoyaltyPointsSchema.index({ 'pointsHistory.expiryDate': 1 });