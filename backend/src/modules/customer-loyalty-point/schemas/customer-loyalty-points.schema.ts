import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'CustomerLoyaltyPoints' })
export class CustomerLoyaltyPoints extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Stores', required: true })
  storeId: Types.ObjectId; // Mã cửa hàng

  @Prop({ type: Types.ObjectId, ref: 'Customers', required: true })
  customerId: Types.ObjectId; // Mã khách hàng

  @Prop({ type: Types.ObjectId, ref: 'LoyaltyPrograms', required: true })
  programId: Types.ObjectId; // Mã chương trình

  @Prop({ default: 0 })
  currentPoints: number; // Điểm hiện tại

  @Prop({ default: 0 })
  totalPointsEarned: number; // Tổng điểm kiếm được

  @Prop({ default: 0 })
  totalPointsRedeemed: number; // Tổng điểm đã đổi

  @Prop()
  tier: string; // Cấp bậc

  @Prop({ type: [{ type: String, points: Number, orderId: Types.ObjectId, rewardId: Types.ObjectId, description: String, expiryDate: Date, createdAt: Date }] })
  pointsHistory: { type: string; points: number; orderId: Types.ObjectId; rewardId: Types.ObjectId; description: string; expiryDate: Date; createdAt: Date }[]; // Lịch sử điểm
}

export const CustomerLoyaltyPointsSchema = SchemaFactory.createForClass(CustomerLoyaltyPoints);