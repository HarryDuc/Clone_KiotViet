import mongoose from "mongoose";

const carrierSchema = new mongoose.Schema({
  carrierId: { type: String, unique: true }, // Mã đối tác
  name: { type: String, required: true }, // Tên đối tác
  phone: { type: String }, // Số điện thoại
  email: { type: String }, // Email
  address: { type: String }, // Địa chỉ
  group: { type: Schema.Types.ObjectId, ref: "CarrierGroups" }, // Nhóm đối tác
  totalOrders: { type: Number, default: 0 }, // Tổng đơn hàng
  totalFees: { type: Number, default: 0 }, // Tổng phí
  status: {
    type: String,
    enum: ["Đang hoạt động", "Ngừng hoạt động"],
    default: "Đang hoạt động",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Carriers", carrierSchema);
