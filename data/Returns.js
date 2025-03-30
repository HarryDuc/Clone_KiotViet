import mongoose from "mongoose";
const returnSchema = new mongoose.Schema({
  returnId: { type: String, unique: true }, // Mã trả hàng
  returnCode: { type: String }, // Mã vận đơn bán
  orderId: { type: Schema.Types.ObjectId, ref: "Orders" }, // Tham chiếu đơn hàng
  products: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "Products" },
      quantity: { type: Number },
    },
  ], // Danh sách sản phẩm trả
  reason: { type: String }, // Lý do trả
  totalRefund: { type: Number }, // Tổng tiền hoàn
  status: { type: String, enum: ["Đã trả", "Đã hủy"], default: "Đã trả" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Returns", returnSchema);
