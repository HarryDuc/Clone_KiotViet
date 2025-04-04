import mongoose from "mongoose";
const purchaseOrderSchema = new mongoose.Schema({
  purchaseOrderId: { type: String, unique: true }, // Mã nhập hàng
  purchaseOrderCode: { type: String }, // Mã trả nhập hàng
  supplierId: { type: Schema.Types.ObjectId, ref: "Suppliers" }, // Tham chiếu nhà cung cấp
  products: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "Products" },
      quantity: { type: Number },
      price: { type: Number },
    },
  ], // Danh sách sản phẩm
  totalAmount: { type: Number }, // Tổng tiền
  status: {
    type: String,
    enum: ["Phiếu tạm thời", "Đã nhập hàng", "Đã hủy"],
    default: "Phiếu tạm thời",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("PurchaseOrders", purchaseOrderSchema);
