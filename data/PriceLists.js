import mongoose from "mongoose";

const priceListSchema = new mongoose.Schema({
  priceListId: { type: String, unique: true }, // Mã bảng giá
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stores",
    required: true,
  },
  name: { type: String, required: true }, // Tên bảng giá
  description: { type: String }, // Mô tả
  type: {
    type: String,
    enum: ["Bán lẻ", "Bán buôn", "Đại lý", "Khuyến mãi"],
    required: true,
  },
  status: {
    type: String,
    enum: ["Đang hoạt động", "Ngừng hoạt động"],
    default: "Đang hoạt động",
  },
  validFrom: { type: Date }, // Ngày bắt đầu áp dụng
  validTo: { type: Date }, // Ngày kết thúc áp dụng
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true,
      },
      price: { type: Number, required: true }, // Giá bán
      minQuantity: { type: Number, default: 1 }, // Số lượng tối thiểu
      maxQuantity: { type: Number }, // Số lượng tối đa
      discount: { type: Number, default: 0 }, // Giảm giá
      discountType: {
        type: String,
        enum: ["Phần trăm", "Số tiền"],
        default: "Phần trăm",
      },
    },
  ],
  customerGroups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CustomerGroups",
    },
  ],
  conditions: {
    minOrderValue: { type: Number }, // Giá trị đơn hàng tối thiểu
    maxOrderValue: { type: Number }, // Giá trị đơn hàng tối đa
    paymentMethods: [{ type: String }], // Phương thức thanh toán áp dụng
    locations: [{ type: String }], // Khu vực áp dụng
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Indexes
priceListSchema.index({ storeId: 1 });
priceListSchema.index({ name: 1 });
priceListSchema.index({ type: 1 });
priceListSchema.index({ "products.productId": 1 });

export default mongoose.model("PriceLists", priceListSchema);
