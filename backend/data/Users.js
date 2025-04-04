import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  userId: { type: String, unique: true }, // Mã tài khoản
  username: { type: String, required: true }, // Tên đăng nhập
  password: { type: String, required: true }, // Mật khẩu (mã hóa)
  fullName: { type: String }, // Tên người dùng
  role: { type: String }, // Vai trò (VD: Admin, Nhân viên)
  branch: { type: Schema.Types.ObjectId, ref: "Brands" }, // Chi nhánh làm việc
  email: { type: String }, // Email
  phone: { type: String }, // Số điện thoại
  isAdmin: { type: Boolean, default: false }, // Quyền truy cập toàn bộ hệ thống
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Users", userSchema);
