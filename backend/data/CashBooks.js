import mongoose from "mongoose";

const cashBookSchema = new mongoose.Schema({
  cashBookId: { type: String, unique: true }, // Mã sổ quỹ
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stores",
    required: true,
  },
  type: {
    type: String,
    enum: ["Thu", "Chi"],
    required: true,
  },
  category: {
    type: String,
    enum: [
      "Thu từ bán hàng",
      "Thu từ khác",
      "Chi mua hàng",
      "Chi lương",
      "Chi vận chuyển",
      "Chi marketing",
      "Chi khác",
    ],
    required: true,
  },
  amount: { type: Number, required: true }, // Số tiền
  paymentMethod: {
    type: String,
    enum: ["Tiền mặt", "Chuyển khoản", "Thẻ tín dụng", "Ví điện tử"],
    required: true,
  },
  reference: {
    type: String,
    enum: ["Đơn hàng", "Hóa đơn", "Phiếu nhập", "Phiếu xuất", "Khác"],
    required: true,
  },
  referenceId: { type: mongoose.Schema.Types.ObjectId, ref: "Orders" }, // ID tham chiếu
  description: { type: String }, // Mô tả
  date: { type: Date, required: true }, // Ngày giao dịch
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employees",
    required: true,
  },
  attachments: [{ type: String }], // Tệp đính kèm
  status: {
    type: String,
    enum: ["Đã xác nhận", "Chờ xác nhận", "Đã hủy"],
    default: "Chờ xác nhận",
  },
  notes: { type: String }, // Ghi chú
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Indexes
cashBookSchema.index({ storeId: 1 });
cashBookSchema.index({ type: 1 });
cashBookSchema.index({ category: 1 });
cashBookSchema.index({ date: 1 });
cashBookSchema.index({ referenceId: 1 });

export default mongoose.model("CashBooks", cashBookSchema);
