import mongoose from "mongoose";
const supplierGroupSchema = new mongoose.Schema({
  groupId: { type: String, unique: true }, // Mã nhóm
  name: { type: String, required: true }, // Tên nhóm
  description: { type: String }, // Mô tả
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("SupplierGroups", supplierGroupSchema);
