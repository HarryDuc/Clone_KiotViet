import mongoose from "mongoose";
const productChema = new mongoose.Schema({
  productId: { type: String, unique: true }, // Mã hàng (tự động tạo)
  barcode: { type: String }, // Mã vạch
  name: { type: String, required: true }, // Tên hàng
  category: { type: Schema.Types.ObjectId, ref: "Categories" }, // Nhóm hàng
  brand: { type: Schema.Types.ObjectId, ref: "Brands" }, // Thương hiệu
  price: { type: Number, required: true }, // Giá bán
  cost: { type: Number }, // Giá vốn
  stock: { type: Number, default: 0 }, // Tồn kho
  location: { type: String }, // Vị trí
  minStock: { type: Number }, // Định mức tồn ít nhất
  maxStock: { type: Number }, // Định mức tồn nhiều nhất
  status: {
    type: String,
    enum: ["Cho phép kinh doanh", "Ngừng kinh doanh"],
    default: "Cho phép kinh doanh",
  },
  image: { type: String }, // URL hình ảnh
  weight: { type: Number }, // Trọng lượng (g, kg)
  unit: { type: String }, // Đơn vị tính (lốc, hộp, thùng...)
  description: { type: String }, // Mô tả sản phẩm
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Products", productChema);
