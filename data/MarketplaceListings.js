import mongoose from "mongoose";

const marketplaceListingSchema = new mongoose.Schema({
  // ID gian hàng
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stores",
    required: true,
  },
  // Thông tin sản phẩm
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
    required: true,
  },
  // Thông tin marketplace
  marketplace: {
    type: String,
    enum: ["Shopee", "Lazada", "Tiki", "Sendo", "ZaloShop", "FacebookShop"],
    required: true,
  },
  // Thông tin listing
  listingId: { type: String }, // ID sản phẩm trên marketplace
  listingUrl: { type: String }, // URL sản phẩm trên marketplace
  title: { type: String, required: true },
  description: { type: String },
  images: [{ type: String }],
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  stock: { type: Number, required: true },
  sku: { type: String },
  // Thuộc tính sản phẩm
  attributes: [
    {
      name: { type: String },
      value: { type: String },
    },
  ],
  // Phân loại
  category: { type: String },
  subCategory: { type: String },
  // Vận chuyển
  shipping: {
    methods: [{ type: String }],
    weight: { type: Number },
    dimensions: {
      length: { type: Number },
      width: { type: Number },
      height: { type: Number },
    },
  },
  // Thông tin bán hàng
  sales: {
    totalSales: { type: Number, default: 0 },
    totalRevenue: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
  },
  // Trạng thái
  status: {
    type: String,
    enum: ["Đang hoạt động", "Tạm ngưng", "Đã xóa", "Lỗi"],
    default: "Đang hoạt động",
  },
  // Thông tin đồng bộ
  lastSync: { type: Date },
  syncStatus: {
    type: String,
    enum: ["Thành công", "Thất bại", "Đang xử lý"],
    default: "Thành công",
  },
  syncError: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Indexes
marketplaceListingSchema.index({ storeId: 1 });
marketplaceListingSchema.index({ productId: 1 });
marketplaceListingSchema.index({ marketplace: 1 });
marketplaceListingSchema.index({ listingId: 1 });
marketplaceListingSchema.index({ status: 1 });

export default mongoose.model("MarketplaceListings", marketplaceListingSchema);
