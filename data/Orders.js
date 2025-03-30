import mongoose from "mongoose";
const orderChema = new mongoose.Schema({
  orderId: { type: String, unique: true }, // Mã đặt hàng
  orderCode: { type: String, unique: true }, // Mã vận đơn
  customerId: { type: Schema.Types.ObjectId, ref: "Customers" }, // Tham chiếu khách hàng
  products: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "Products" },
      quantity: { type: Number },
      price: { type: Number },
      discount: { type: Number, default: 0 },
    },
  ], // Danh sách sản phẩm
  totalAmount: { type: Number }, // Tổng tiền
  discount: { type: Number, default: 0 }, // Giảm giá
  paymentMethod: {
    type: String,
    enum: ["Tiền mặt", "Chuyển khoản", "Thẻ", "Ví"],
  }, // Phương thức thanh toán
  status: {
    type: String,
    enum: [
      "Phiếu tạm thời",
      "Đã xác nhận",
      "Đang giao hàng",
      "Hoàn thành",
      "Đã hủy",
    ],
    default: "Phiếu tạm thời",
  },
  channel: { type: Schema.Types.ObjectId, ref: "SalesChannels" }, // Kênh bán
  carrierId: { type: Schema.Types.ObjectId, ref: "Carriers" }, // Đối tác giao hàng
  deliveryDate: { type: Date }, // Thời gian giao hàng
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Orders", orderChema);
