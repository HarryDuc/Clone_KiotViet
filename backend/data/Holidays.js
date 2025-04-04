import mongoose from "mongoose";

const holidaySchema = new mongoose.Schema({
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stores",
    required: true,
  },
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ["Ngày lễ", "Ngày đặc biệt", "Sự kiện của công ty"],
    required: true,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  duration: { type: Number }, // Số ngày
  description: { type: String },
  isRecurring: { type: Boolean, default: false },
  recurringPattern: {
    frequency: { type: String, enum: ["Hàng năm", "Hàng tháng", "Hàng tuần"] },
    interval: { type: Number }, // Số năm/tháng/tuần
    endAfter: { type: Date }, // Ngày kết thúc lặp lại
  },
  status: {
    type: String,
    enum: ["Đang hoạt động", "Ngừng hoạt động"],
    default: "Đang hoạt động",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Indexes
holidaySchema.index({ storeId: 1 });
holidaySchema.index({ startDate: 1 });
holidaySchema.index({ endDate: 1 });
holidaySchema.index({ type: 1 });
holidaySchema.index({ status: 1 });

export default mongoose.model("Holidays", holidaySchema);
