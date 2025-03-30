import mongoose from "mongoose";
const destructionSchema = new mongoose.Schema({
  destructionId: { type: String, unique: true }, // Mã xuất hủy
  destructionCode: { type: String }, // Mã tham chiếu
  products: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "Products" },
      quantity: { type: Number },
    },
  ], // Danh sách sản phẩm
  totalValue: { type: Number }, // Tổng giá trị hủy
  status: {
    type: String,
    enum: ["Phiếu tạm thời", "Hoàn thành", "Đã hủy"],
    default: "Phiếu tạm thời",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Destructions", destructionSchema);
