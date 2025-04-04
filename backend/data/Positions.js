import mongoose from "mongoose";
const positionSchema = new mongoose.Schema({
  positionId: { type: String, unique: true }, // Mã chức danh
  name: { type: String, required: true }, // Tên chức danh
  description: { type: String }, // Mô tả
  status: {
    type: String,
    enum: ["Hoạt động", "Ngừng hoạt động"],
    default: "Hoạt động",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Positions", positionSchema);
