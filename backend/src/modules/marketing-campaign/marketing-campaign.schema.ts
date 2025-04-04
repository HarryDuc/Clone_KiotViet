import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class MarketingCampaign extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Stores', required: true })
  storeId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({
    enum: ['Giảm giá', 'Giao hàng miễn phí', 'Quà tặng', 'Gói', 'Điểm khách hàng thân thiết'],
    required: true,
  })
  type: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({
    enum: ['Bản nháp', 'Đang hoạt động', 'Đã tạm dừng', 'Đã kết thúc', 'Đã hủy'],
    default: 'Bản nháp',
  })
  status: string;

  @Prop({
    type: {
      minOrderValue: Number,
      maxDiscount: Number,
      applicableProducts: [{ type: Types.ObjectId, ref: 'Products' }],
      applicableCategories: [{ type: Types.ObjectId, ref: 'Categories' }],
      applicableCustomerGroups: [{ type: Types.ObjectId, ref: 'CustomerGroups' }],
      usageLimit: Number,
      usagePerCustomer: Number,
    },
  })
  conditions: {
    minOrderValue: number;
    maxDiscount: number;
    applicableProducts: Types.ObjectId[];
    applicableCategories: Types.ObjectId[];
    applicableCustomerGroups: Types.ObjectId[];
    usageLimit: number;
    usagePerCustomer: number;
  };

  @Prop({
    type: {
      discountType: { type: String, enum: ['Tỷ lệ phần trăm', 'Số tiền cố định'] },
      discountValue: Number,
      freeShipping: Boolean,
      giftProduct: { type: Types.ObjectId, ref: 'Products' },
      bundleProducts: [{ product: { type: Types.ObjectId, ref: 'Products' }, quantity: Number }],
      loyaltyPoints: Number,
    },
  })
  rewards: {
    discountType: string;
    discountValue: number;
    freeShipping: boolean;
    giftProduct: Types.ObjectId;
    bundleProducts: { product: Types.ObjectId; quantity: number }[];
    loyaltyPoints: number;
  };

  @Prop({
    type: {
      totalUsage: { type: Number, default: 0 },
      totalRevenue: { type: Number, default: 0 },
      totalCustomers: { type: Number, default: 0 },
    },
  })
  statistics: {
    totalUsage: number;
    totalRevenue: number;
    totalCustomers: number;
  };
}

export const MarketingCampaignSchema = SchemaFactory.createForClass(MarketingCampaign);

MarketingCampaignSchema.index({ storeId: 1 });
MarketingCampaignSchema.index({ startDate: 1 });
MarketingCampaignSchema.index({ endDate: 1 });
MarketingCampaignSchema.index({ status: 1 });
MarketingCampaignSchema.index({ 'conditions.applicableProducts': 1 });
MarketingCampaignSchema.index({ 'conditions.applicableCategories': 1 });
MarketingCampaignSchema.index({ 'conditions.applicableCustomerGroups': 1 });