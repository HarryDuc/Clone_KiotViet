import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
  brandId: { type: String, unique: true }, // Mã thương hiệu
  name: { type: String, required: true }, // Tên thương hiệu
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Brands", brandSchema);
