import mongoose from "mongoose";
const transactionSchema = new mongoose.Schema({
  transactionId: { type: String, unique: true }, // Mã giao dịch
  storeId: { type: Schema.Types.ObjectId, ref: "Stores" }, // Tham chiếu gian hàng
  type: { type: String, enum: ["Nạp tiền", "Chi tiêu"] }, // Loại giao dịch
  amount: { type: Number, required: true }, // Số tiền
  date: { type: Date, default: Date.now }, // Ngày giao dịch
  description: { type: String }, // Mô tả
  balanceBefore: { type: Number }, // Số dư trước giao dịch
  balanceAfter: { type: Number }, // Số dư sau giao dịch
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Transactions", transactionSchema);
