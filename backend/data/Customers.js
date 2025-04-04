import mongoose from "mongoose";
const customerSchema = new mongoose.Schema({
  customerId: { type: String, unique: true }, // Mã khách hàng
  name: { type: String, required: true }, // Tên khách hàng
  phone: { type: String }, // Số điện thoại
  email: { type: String }, // Email
  address: { type: String }, // Địa chỉ
  customerType: { type: String, enum: ["Cá nhân", "Công ty"] }, // Loại khách
  taxCode: { type: String }, // Mã số thuế
  idCard: { type: String }, // CMND/CCCD
  group: { type: Schema.Types.ObjectId, ref: "CustomerGroups" }, // Nhóm khách hàng
  debt: { type: Number, default: 0 }, // Nợ hiện tại
  totalSales: { type: Number, default: 0 }, // Tổng bán
  status: {
    type: String,
    enum: ["Đang hoạt động", "Ngừng hoạt động"],
    default: "Đang hoạt động",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Customers", customerSchema);
