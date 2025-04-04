import mongoose from "mongoose";

const marketingCampaignSchema = new mongoose.Schema({
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stores",
    required: true,
  },
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ["Giảm giá", "Giao hàng miễn phí", "Quà tặng", "Gói", "Điểm khách hàng thân thiết"],
    required: true,
  },
  description: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["Bản nháp", "Đang hoạt động", "Đã tạm dừng", "Đã kết thúc", "Đã hủy"],
    default: "Bản nháp",
  },
  conditions: {
    minOrderValue: { type: Number },
    maxDiscount: { type: Number },
    applicableProducts: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
    ],
    applicableCategories: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Categories" },
    ],
    applicableCustomerGroups: [
      { type: mongoose.Schema.Types.ObjectId, ref: "CustomerGroups" },
    ],
    usageLimit: { type: Number }, // Số lần sử dụng tối đa
    usagePerCustomer: { type: Number }, // Số lần sử dụng tối đa cho mỗi khách hàng
  },
  rewards: {
    discountType: { type: String, enum: ["Tỷ lệ phần trăm", "Số tiền cố định"] },
    discountValue: { type: Number },
    freeShipping: { type: Boolean },
    giftProduct: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
    bundleProducts: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
        quantity: { type: Number },
      },
    ],
    loyaltyPoints: { type: Number },
  },
  statistics: {
    totalUsage: { type: Number, default: 0 },
    totalRevenue: { type: Number, default: 0 },
    totalCustomers: { type: Number, default: 0 },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Indexes
marketingCampaignSchema.index({ storeId: 1 });
marketingCampaignSchema.index({ startDate: 1 });
marketingCampaignSchema.index({ endDate: 1 });
marketingCampaignSchema.index({ status: 1 });
marketingCampaignSchema.index({ "conditions.applicableProducts": 1 });
marketingCampaignSchema.index({ "conditions.applicableCategories": 1 });
marketingCampaignSchema.index({ "conditions.applicableCustomerGroups": 1 });

export default mongoose.model("MarketingCampaigns", marketingCampaignSchema);
