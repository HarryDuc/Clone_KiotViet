import mongoose from "mongoose";
const servicePackageSchema = new mongoose.Schema({
  packageId: { type: String, unique: true }, // Mã gói dịch vụ
  name: { type: String, required: true }, // Tên gói (VD: Hỗ trợ, Chuyên nghiệp, Cao cấp)
  description: { type: String }, // Mô tả
  features: [{ type: String }], // Danh sách chức năng
  price: { type: Number, required: true }, // Giá gói
  durationOptions: [{ type: Number }], // Các tùy chọn thời gian (1-5 năm)
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("ServicePackages", servicePackageSchema);
