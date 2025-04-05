import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Tier {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  minPoints: number;

  @Prop() // Thêm trường maxPoints
  maxPoints?: number; // Số điểm tối đa của cấp bậc (tùy chọn nếu không có giới hạn trên)

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
  @Prop({ required: true, unique: true }) // Thêm rewardId để định danh
  rewardId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  points: number;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop({ default: 0 })
  stock: number;

  @Prop({ enum: ['Có sẵn', 'Hết hàng', 'Không hoạt động'], default: 'Có sẵn' })
  status: string;

  // Gợi ý nâng cấp
  @Prop({ type: Date })
  expiryDate?: Date; // Ngày hết hạn phần thưởng
}

export const RewardSchema = SchemaFactory.createForClass(Reward);

@Schema({ timestamps: true, collection: 'LoyaltyPrograms' })
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
    earnRate: number; // Tỷ lệ kiếm điểm (ví dụ: 1 điểm mỗi 1000 VNĐ)
    minPoints: number; // Điểm tối thiểu để sử dụng
    pointValue: number; // Giá trị quy đổi (ví dụ: 1 điểm = 100 VNĐ)
    expiryDays: number; // Số ngày điểm hết hạn
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
      totalRevenueFromLoyalty: { type: Number, default: 0 }, // Thêm
    },
  })
  statistics: {
    totalMembers: number;
    totalPointsIssued: number;
    totalPointsRedeemed: number;
    totalRewardsRedeemed: number;
    totalRevenueFromLoyalty: number; // Doanh thu từ chương trình
  };

  // Gợi ý nâng cấp
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Customers' }] })
  members?: Types.ObjectId[]; // Danh sách khách hàng tham gia
}

export const LoyaltyProgramSchema = SchemaFactory.createForClass(LoyaltyProgram);

// Indexes (giữ nguyên và bổ sung)
LoyaltyProgramSchema.index({ storeId: 1 });
LoyaltyProgramSchema.index({ status: 1 });
LoyaltyProgramSchema.index({ 'tiers.minPoints': 1 });
LoyaltyProgramSchema.index({ 'rewards.points': 1 });
LoyaltyProgramSchema.index({ 'rewards.status': 1 });
LoyaltyProgramSchema.index({ 'rewards.rewardId': 1 }); // Thêm index cho rewardId