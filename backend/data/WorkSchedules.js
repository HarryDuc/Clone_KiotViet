import mongoose from "mongoose";

const workScheduleSchema = new mongoose.Schema({
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stores",
    required: true,
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employees",
    required: true,
  },
  // Lịch làm việc theo tuần
  weeklySchedule: {
    monday: {
      isWorking: { type: Boolean, default: true },
      startTime: { type: String },
      endTime: { type: String },
      breakTime: { type: String },
    },
    tuesday: {
      isWorking: { type: Boolean, default: true },
      startTime: { type: String },
      endTime: { type: String },
      breakTime: { type: String },
    },
    wednesday: {
      isWorking: { type: Boolean, default: true },
      startTime: { type: String },
      endTime: { type: String },
      breakTime: { type: String },
    },
    thursday: {
      isWorking: { type: Boolean, default: true },
      startTime: { type: String },
      endTime: { type: String },
      breakTime: { type: String },
    },
    friday: {
      isWorking: { type: Boolean, default: true },
      startTime: { type: String },
      endTime: { type: String },
      breakTime: { type: String },
    },
    saturday: {
      isWorking: { type: Boolean, default: false },
      startTime: { type: String },
      endTime: { type: String },
      breakTime: { type: String },
    },
    sunday: {
      isWorking: { type: Boolean, default: false },
      startTime: { type: String },
      endTime: { type: String },
      breakTime: { type: String },
    },
  },
  // Lịch làm việc đặc biệt
  specialSchedules: [
    {
      date: { type: Date },
      isWorking: { type: Boolean },
      startTime: { type: String },
      endTime: { type: String },
      breakTime: { type: String },
      reason: { type: String },
    },
  ],
  // Cài đặt làm thêm giờ
  overtimeSettings: {
    allowed: { type: Boolean, default: true },
    maxHoursPerWeek: { type: Number, default: 40 },
    rate: { type: Number, default: 1.5 }, // Hệ số lương làm thêm
  },
  // Cài đặt nghỉ phép
  leaveSettings: {
    annualLeave: { type: Number, default: 12 }, // Số ngày nghỉ phép năm
    sickLeave: { type: Number, default: 5 }, // Số ngày nghỉ ốm
    maternityLeave: { type: Number, default: 180 }, // Số ngày nghỉ thai sản
  },
  status: {
    type: String,
    enum: ["Đang hoạt động", "Tạm ngưng", "Đã hủy"],
    default: "Đang hoạt động",
  },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Indexes
workScheduleSchema.index({ storeId: 1 });
workScheduleSchema.index({ employeeId: 1 });
workScheduleSchema.index({ "specialSchedules.date": 1 });

export default mongoose.model("WorkSchedules", workScheduleSchema);
