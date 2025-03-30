import mongoose from "mongoose";
const employeeSchema = new mongoose.Schema({
  employeeId: { type: String, unique: true }, // Mã nhân viên (tự động tạo)
  name: { type: String, required: true }, // Tên nhân viên
  phone: { type: String }, // Số điện thoại
  email: { type: String }, // Email
  address: { type: String }, // Địa chỉ
  branchSalary: { type: Schema.Types.ObjectId, ref: "Branches" }, // Chi nhánh trả lương
  branchWork: { type: Schema.Types.ObjectId, ref: "Branches" }, // Chi nhánh làm việc
  startDate: { type: Date }, // Ngày bắt đầu làm việc
  position: { type: Schema.Types.ObjectId, ref: "Positions" }, // Chức danh
  department: { type: Schema.Types.ObjectId, ref: "Departments" }, // Phòng ban
  userAccount: { type: Schema.Types.ObjectId, ref: "Users" }, // Tài khoản đăng nhập
  idCard: { type: String }, // CMND/CCCD
  dob: { type: Date }, // Ngày sinh
  gender: { type: String, enum: ["Nam", "Nữ", "Khác"] }, // Giới tính
  salaryType: {
    type: String,
    enum: ["Theo ca", "Theo giờ", "Theo ngày công", "Cố định"],
  }, // Hình thức lương
  salaryDetails: {
    shiftRate: { type: Number }, // Lương ca (nếu theo ca)
    hourlyRate: { type: Number }, // Lương giờ (nếu theo giờ)
    dailyRate: { type: Number }, // Lương ngày (nếu theo ngày công)
    fixedRate: { type: Number }, // Lương cố định
  },
  bonus: [
    {
      type: {
        type: String,
        enum: ["Doanh thu cá nhân", "Lợi nhuận chi nhánh", "Lợi nhuận gộp"],
      },
      form: {
        type: String,
        enum: ["Tổng doanh thu", "Bậc thang doanh thu", "Vượt doanh thu"],
      },
      value: { type: Number }, // Giá trị thưởng (% hoặc VND)
    },
  ],
  commission: { type: Number }, // Tỷ lệ hoa hồng (%)
  commissionTable: { type: Schema.Types.ObjectId, ref: "CommissionSettings" }, // Bảng hoa hồng
  allowance: [
    {
      name: { type: String }, // Tên phụ cấp
      type: {
        type: String,
        enum: [
          "Theo ngày",
          "Hàng tháng cố định",
          "Hàng tháng tính trên ngày công",
        ],
      },
      value: { type: Number }, // Giá trị phụ cấp
      valueType: { type: String, enum: ["VND", "%"] }, // Loại giá trị
    },
  ],
  deduction: [
    {
      name: { type: String }, // Tên giảm trừ
      type: { type: String, enum: ["Đi muộn", "Về sớm", "Cố định"] },
      condition: { type: String, enum: ["Theo số lần", "Theo phút"] },
      value: { type: Number }, // Giá trị giảm trừ
    },
  ],
  status: {
    type: String,
    enum: ["Đang làm việc", "Đã nghỉ"],
    default: "Đang làm việc",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Employees", employeeSchema);
