import mongoose from "mongoose";

const commissionSettingSchema = new mongoose.Schema({
  commissionId: { type: String, unique: true }, // Mã bảng hoa hồng
  name: { type: String, required: true }, // Tên bảng
  scope: { type: String, enum: ["Toàn hệ thống", "Chi nhánh"] }, // Phạm vi áp dụng
  branchId: { type: Schema.Types.ObjectId, ref: "Branches" }, // Chi nhánh (nếu có)
  status: {
    type: String,
    enum: ["Áp dụng", "Ngừng áp dụng"],
    default: "Áp dụng",
  },
  details: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "Products" }, // Sản phẩm
      rate: { type: Number }, // Tỷ lệ hoa hồng
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("CommissionSettings", commissionSettingSchema);
