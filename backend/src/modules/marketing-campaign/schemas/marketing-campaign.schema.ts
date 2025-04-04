import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'MarketingCampaigns' })
export class MarketingCampaign extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Stores', required: true })
  storeId: Types.ObjectId; // Mã cửa hàng

  @Prop({ required: true })
  name: string; // Tên chiến dịch

  @Prop({ enum: ['discount', 'free_shipping', 'gift', 'bundle', 'loyalty_points'], required: true })
  type: string; // Loại chiến dịch

  @Prop()
  description: string; // Mô tả

  @Prop({ required: true })
  startDate: Date; // Ngày bắt đầu

  @Prop({ required: true })
  endDate: Date; // Ngày kết thúc

  @Prop({ enum: ['draft', 'active', 'paused', 'ended', 'cancelled'], default: 'draft' })
  status: string; // Trạng thái

  @Prop({ type: { minOrderValue: Number, maxDiscount: Number, applicableProducts: [Types.ObjectId], applicableCategories: [Types.ObjectId], applicableCustomerGroups: [Types.ObjectId], usageLimit: Number, usagePerCustomer: Number } })
  conditions: {
    minOrderValue: number; // Giá trị đơn hàng tối thiểu
    maxDiscount: number; // Chiết khấu tối đa
    applicableProducts: Types.ObjectId[]; // Sản phẩm áp dụng
    applicableCategories: Types.ObjectId[]; // Danh mục áp dụng
    applicableCustomerGroups: Types.ObjectId[]; // Nhóm khách hàng áp dụng
    usageLimit: number; // Giới hạn sử dụng
    usagePerCustomer: number; // Giới hạn sử dụng mỗi khách
  };

  @Prop({ type: { discountType: String, discountValue: Number, freeShipping: Boolean, giftProduct: Types.ObjectId, bundleProducts: [{ product: Types.ObjectId, quantity: Number }], loyaltyPoints: Number } })
  rewards: {
    discountType: string; // Loại chiết khấu
    discountValue: number; // Giá trị chiết khấu
    freeShipping: boolean; // Miễn phí vận chuyển
    giftProduct: Types.ObjectId; // Sản phẩm tặng
    bundleProducts: { product: Types.ObjectId; quantity: number }[]; // Gói sản phẩm
    loyaltyPoints: number; // Điểm khách hàng thân thiết
  };

  @Prop({ type: { totalUsage: Number, totalRevenue: Number, totalCustomers: Number } })
  statistics: {
    totalUsage: number; // Tổng lần sử dụng
    totalRevenue: number; // Tổng doanh thu
    totalCustomers: number; // Tổng khách hàng
  };
}

export const MarketingCampaignSchema = SchemaFactory.createForClass(MarketingCampaign);