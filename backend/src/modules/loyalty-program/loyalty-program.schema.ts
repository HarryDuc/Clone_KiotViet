import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Tier {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  minPoints: number;

  @Prop({
    type: [
      {
        type: { type: String, enum: ['Giảm giá', 'Miễn phí vận chuyển', 'Quà tặng', 'Quyền truy cập đặc biệt'] },
        value: Number,
        description: String,
      },
    ],
  })
  benefits: { type: string; value: number; description: string }[];
}

export const TierSchema = SchemaFactory.createForClass(Tier);

@Schema()
export class Reward {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  points: number;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop()
  stock: number;

  @Prop({ enum: ['Có sẵn', 'Hết hàng', 'Không hoạt động'], default: 'Có sẵn' })
  status: string;
}

export const RewardSchema = SchemaFactory.createForClass(Reward);

@Schema({ timestamps: true })
export class LoyaltyProgram extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Stores', required: true })
  storeId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ enum: ['Đang hoạt động', 'Ngừng hoạt động'], default: 'Đang hoạt động' })
  status: string;

  @Prop({
    type: {
      earnRate: Number,
      minPoints: Number,
      pointValue: Number,
      expiryDays: Number,
    },
  })
  pointRules: {
    earnRate: number;
    minPoints: number;
    pointValue: number;
    expiryDays: number;
  };

  @Prop({ type: [TierSchema] })
  tiers: Tier[];

  @Prop({ type: [RewardSchema] })
  rewards: Reward[];

  @Prop({
    type: {
      totalMembers: { type: Number, default: 0 },
      totalPointsIssued: { type: Number, default: 0 },
      totalPointsRedeemed: { type: Number, default: 0 },
      totalRewardsRedeemed: { type: Number, default: 0 },
    },
  })
  statistics: {
    totalMembers: number;
    totalPointsIssued: number;
    totalPointsRedeemed: number;
    totalRewardsRedeemed: number;
  };
}

export const LoyaltyProgramSchema = SchemaFactory.createForClass(LoyaltyProgram);

LoyaltyProgramSchema.index({ storeId: 1 });
LoyaltyProgramSchema.index({ status: 1 });
LoyaltyProgramSchema.index({ 'tiers.minPoints': 1 });
LoyaltyProgramSchema.index({ 'rewards.points': 1 });
LoyaltyProgramSchema.index({ 'rewards.status': 1 });