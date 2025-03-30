import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
  storeId: { type: String, unique: true }, // Mã gian hàng (tự động tạo)
  accountType: { type: String, enum: ["Cá nhân", "Doanh nghiệp"] }, // Loại tài khoản
  representative: { type: String, required: true }, // Người đại diện
  phone: { type: String, required: true }, // Số điện thoại
  email: { type: String }, // Email
  gender: { type: String, enum: ["Nam", "Nữ", "Khác"] }, // Giới tính
  dob: { type: Date }, // Ngày sinh
  idCard: { type: String }, // CCCD/Hộ chiếu
  issueDate: { type: Date }, // Ngày cấp
  issuePlace: { type: String }, // Nơi cấp
  address: { type: String }, // Địa chỉ
  storeName: { type: String, required: true }, // Tên gian hàng
  industry: { type: String }, // Ngành hàng
  branchCount: { type: Number, default: 0 }, // Số chi nhánh
  employeeCount: { type: Number, default: 0 }, // Số nhân viên
  status: {
    type: String,
    enum: ["Đang sử dụng", "Ngừng sử dụng"],
    default: "Đang sử dụng",
  }, // Tình trạng
  expirationDate: { type: Date }, // Ngày hết hạn
  servicePackage: { type: Schema.Types.ObjectId, ref: "ServicePackages" }, // Gói dịch vụ
  warehouseCount: { type: Number, default: 0 }, // Số lượng kho
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Stores", storeSchema);