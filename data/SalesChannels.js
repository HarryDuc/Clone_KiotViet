import mongoose from "mongoose";
import { Schema } from "mongoose";

const salesChannelSchema = new mongoose.Schema({
  storeId: { type: Schema.Types.ObjectId, ref: "Stores", required: true },
  name: { type: String, required: true },
  type: {
    type: String,
    enum: [
      "Trực tiếp",
      "Shopee",
      "Tiki",
      "Lazada",
      "Sendo",
      "Facebook",
      "Instagram",
    ],
    required: true,
  },
  description: { type: String },
  status: {
    type: String,
    enum: ["Đang hoạt động", "Ngừng hoạt động"],
    default: "Đang hoạt động",
  },
  settings: {
    // Cài đặt chung
    syncProducts: { type: Boolean, default: false },
    syncPrices: { type: Boolean, default: false },
    syncStock: { type: Boolean, default: false },

    // Cài đặt riêng cho từng kênh
    shopee: {
      shopId: { type: String },
      accessToken: { type: String },
      refreshToken: { type: String },
      tokenExpiry: { type: Date },
    },
    tiki: {
      sellerId: { type: String },
      accessToken: { type: String },
      refreshToken: { type: String },
      tokenExpiry: { type: Date },
    },
    lazada: {
      sellerId: { type: String },
      accessToken: { type: String },
      refreshToken: { type: String },
      tokenExpiry: { type: Date },
    },
    sendo: {
      sellerId: { type: String },
      accessToken: { type: String },
      refreshToken: { type: String },
      tokenExpiry: { type: Date },
    },
    facebook: {
      pageId: { type: String },
      accessToken: { type: String },
      tokenExpiry: { type: Date },
    },
    instagram: {
      businessAccountId: { type: String },
      accessToken: { type: String },
      tokenExpiry: { type: Date },
    },
  },
  statistics: {
    totalOrders: { type: Number, default: 0 },
    totalRevenue: { type: Number, default: 0 },
    totalProducts: { type: Number, default: 0 },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Indexes
salesChannelSchema.index({ storeId: 1 });
salesChannelSchema.index({ type: 1 });
salesChannelSchema.index({ status: 1 });
salesChannelSchema.index({ "settings.shopee.shopId": 1 });
salesChannelSchema.index({ "settings.tiki.sellerId": 1 });
salesChannelSchema.index({ "settings.lazada.sellerId": 1 });
salesChannelSchema.index({ "settings.sendo.sellerId": 1 });
salesChannelSchema.index({ "settings.facebook.pageId": 1 });
salesChannelSchema.index({ "settings.instagram.businessAccountId": 1 });

export default mongoose.model("SalesChannels", salesChannelSchema);
