import mongoose from "mongoose";

const categorieSchema = new mongoose.Schema({
  categoryId: { type: String, unique: true }, // Mã nhóm
  name: { type: String, required: true }, // Tên nhóm
  parentCategory: { type: Schema.Types.ObjectId, ref: "Categories" }, // Nhóm cha
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Categories", categorieSchema);
