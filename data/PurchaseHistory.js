import mongoose from "mongoose";
const purchaseHistorySchema = new mongoose.Schema({
  purchaseId: { type: String, unique: true }, // Mã giao dịch
  storeId: { type: Schema.Types.ObjectId, ref: "Stores" }, // Tham chiếu gian hàng
  packageId: { type: Schema.Types.ObjectId, ref: "ServicePackages" }, // Tham chiếu gói dịch vụ
  purchaseDate: { type: Date, default: Date.now }, // Ngày mua
  duration: { type: Number }, // Thời gian sử dụng (số năm)
  totalAmount: { type: Number }, // Tổng tiền
  status: {
    type: String,
    enum: ["Hoàn thành", "Đang xử lý", "Hủy"],
    default: "Hoàn thành",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("PurchaseHistory", purchaseHistorySchema);
