import mongoose from "mongoose";
const departmentSchema = new mongoose.Schema({
  departmentId: { type: String, unique: true }, // Mã phòng ban
  name: { type: String, required: true }, // Tên phòng ban
  description: { type: String }, // Mô tả
  status: {
    type: String,
    enum: ["Hoạt động", "Ngừng hoạt động"],
    default: "Hoạt động",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Departments", departmentSchema);
