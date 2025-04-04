import mongoose from "mongoose";
const payrollChema = new mongoose.Schema({
  payrollId: { type: String, unique: true }, // Mã bảng lương
  employeeId: { type: Schema.Types.ObjectId, ref: "Employees" }, // Tham chiếu nhân viên
  month: { type: Number }, // Tháng
  year: { type: Number }, // Năm
  basicSalary: { type: Number }, // Lương cơ bản
  bonus: { type: Number, default: 0 }, // Thưởng
  commission: { type: Number, default: 0 }, // Hoa hồng
  allowance: { type: Number, default: 0 }, // Phụ cấp
  deduction: { type: Number, default: 0 }, // Giảm trừ
  total: { type: Number }, // Tổng lương
  paid: { type: Number, default: 0 }, // Đã trả
  status: {
    type: String,
    enum: ["Đang tạo", "Tạm tính", "Đã chốt lương", "Đã hủy"],
    default: "Đang tạo",
  },
  branch: { type: Schema.Types.ObjectId, ref: "Branches" }, // Chi nhánh
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Payrolls", payrollChema);
