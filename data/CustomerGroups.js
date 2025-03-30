import mongoose from "mongoose";
const customerGroupSchema = new mongoose.Schema({
  groupId: { type: String, unique: true }, // Mã nhóm
  name: { type: String, required: true }, // Tên nhóm
  discountType: { type: String, enum: ["VND", "%"] }, // Loại giảm giá
  discountValue: { type: Number }, // Giá trị giảm
  description: { type: String }, // Mô tả
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("CustomerGroups", customerGroupSchema);
