import mongoose from "mongoose";
const returnPurchaseSchema = new mongoose.Schema({
  returnPurchaseId: { type: String, unique: true }, // Mã trả hàng nhập
  returnPurchaseCode: { type: String }, // Mã tham chiếu
  purchaseOrderId: { type: Schema.Types.ObjectId, ref: "PurchaseOrders" }, // Tham chiếu đơn nhập
  products: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "Products" },
      quantity: { type: Number },
    },
  ], // Danh sách sản phẩm
  reason: { type: String }, // Lý do trả
  totalRefund: { type: Number }, // Tổng tiền hoàn
  status: {
    type: String,
    enum: ["Phiếu tạm thời", "Đã trả hàng", "Đã hủy"],
    default: "Phiếu tạm thời",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("ReturnPurchases", returnPurchaseSchema);
