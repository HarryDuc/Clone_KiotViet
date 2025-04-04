import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  invoiceId: { type: String, unique: true }, // Mã hóa đơn
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stores",
    required: true,
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Orders",
    required: true,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customers",
    required: true,
  },
  invoiceNumber: { type: String, required: true }, // Số hóa đơn
  invoiceDate: { type: Date, required: true }, // Ngày lập hóa đơn
  dueDate: { type: Date }, // Ngày thanh toán
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true,
      },
      quantity: { type: Number, required: true },
      unitPrice: { type: Number, required: true },
      discount: { type: Number, default: 0 },
      total: { type: Number, required: true },
    },
  ],
  subtotal: { type: Number, required: true }, // Tổng tiền hàng
  tax: { type: Number, default: 0 }, // Thuế
  shipping: { type: Number, default: 0 }, // Phí vận chuyển
  total: { type: Number, required: true }, // Tổng cộng
  paymentMethod: {
    type: String,
    enum: ["Tiền mặt", "Chuyển khoản", "Thẻ tín dụng", "Ví điện tử"],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: [
      "Chưa thanh toán",
      "Đã thanh toán một phần",
      "Đã thanh toán",
      "Đã hủy",
    ],
    default: "Chưa thanh toán",
  },
  notes: { type: String }, // Ghi chú
  status: {
    type: String,
    enum: ["Draft", "Issued", "Cancelled", "Void"],
    default: "Draft",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Indexes
invoiceSchema.index({ storeId: 1 });
invoiceSchema.index({ orderId: 1 });
invoiceSchema.index({ customerId: 1 });
invoiceSchema.index({ invoiceNumber: 1 });

export default mongoose.model("Invoices", invoiceSchema);
