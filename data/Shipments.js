import mongoose from "mongoose";

const shipmentSchema = new mongoose.Schema({
  shipmentId: { type: String, unique: true }, // Mã vận chuyển
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stores",
    required: true,
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Orders",
    required: true,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customers",
    required: true,
  },
  shippingMethod: {
    type: String,
    enum: [
      "Giao hàng nhanh",
      "Giao hàng tiết kiệm",
      "Viettel Post",
      "Grab Express",
      "Tự giao",
    ],
    required: true,
  },
  trackingNumber: { type: String }, // Mã vận đơn
  shippingFee: { type: Number, required: true }, // Phí vận chuyển
  estimatedDeliveryDate: { type: Date }, // Ngày dự kiến giao hàng
  actualDeliveryDate: { type: Date }, // Ngày giao hàng thực tế
  shippingAddress: {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    ward: { type: String },
    district: { type: String },
    city: { type: String },
    province: { type: String },
    country: { type: String, default: "Việt Nam" },
  },
  status: {
    type: String,
    enum: [
      "Chờ xử lý",
      "Đã nhận đơn",
      "Đang vận chuyển",
      "Đã giao hàng",
      "Giao hàng thất bại",
      "Đã hủy",
    ],
    default: "Chờ xử lý",
  },
  trackingHistory: [
    {
      status: { type: String, required: true },
      location: { type: String },
      timestamp: { type: Date, default: Date.now },
      note: { type: String },
    },
  ],
  notes: { type: String }, // Ghi chú
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Indexes
shipmentSchema.index({ storeId: 1 });
shipmentSchema.index({ orderId: 1 });
shipmentSchema.index({ customerId: 1 });
shipmentSchema.index({ trackingNumber: 1 });

export default mongoose.model("Shipments", shipmentSchema);
