import mongoose from "mongoose";
const supplierSchema = new mongoose.Schema({
  supplierId: { type: String, unique: true }, // Mã nhà cung cấp
  name: { type: String, required: true }, // Tên nhà cung cấp
  phone: { type: String }, // Số điện thoại
  email: { type: String }, // Email
  address: { type: String }, // Địa chỉ
  group: { type: Schema.Types.ObjectId, ref: "SupplierGroups" }, // Nhóm nhà cung cấp
  debt: { type: Number, default: 0 }, // Nợ hiện tại
  totalPurchases: { type: Number, default: 0 }, // Tổng mua
  status: {
    type: String,
    enum: ["Đang hoạt động", "Ngừng hoạt động"],
    default: "Đang hoạt động",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Suppliers", supplierSchema);
