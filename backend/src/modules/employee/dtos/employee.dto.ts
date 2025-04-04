// EmployeeDTO: Đại diện toàn bộ schema
export class EmployeeDTO {
  employeeId: string; // Mã nhân viên
  name: string; // Tên
  phone: string; // Số điện thoại
  email: string; // Email
  address: string; // Địa chỉ
  branchSalary: string; // Mã chi nhánh tính lương
  branchWork: string; // Mã chi nhánh làm việc
  startDate: Date; // Ngày bắt đầu
  position: string; // Mã vị trí
  department: string; // Mã phòng ban
  userAccount: string; // Mã tài khoản
  idCard: string; // CMND/CCCD
  dob: Date; // Ngày sinh
  gender: string; // Giới tính
  salaryType: string; // Loại lương
  salaryDetails: {
    shiftRate: number;
    hourlyRate: number;
    dailyRate: number;
    fixedRate: number;
  }; // Chi tiết lương
  bonus: { type: string; form: string; value: number }[]; // Thưởng
  commission: number; // Hoa hồng
  commissionTable: string; // Mã bảng hoa hồng
  allowance: { name: string; type: string; value: number; valueType: string }[]; // Phụ cấp
  deduction: { name: string; type: string; condition: string; value: number }[]; // Khấu trừ
  status: string; // Trạng thái
}

// CreateEmployeeDTO: Dùng để tạo mới
export class CreateEmployeeDTO {
  name: string; // Tên
  phone: string; // Số điện thoại
  email: string; // Email
  address: string; // Địa chỉ
  branchSalary: string; // Mã chi nhánh tính lương
  branchWork: string; // Mã chi nhánh làm việc
  startDate: Date; // Ngày bắt đầu
  position: string; // Mã vị trí
  department: string; // Mã phòng ban
  userAccount: string; // Mã tài khoản
  idCard: string; // CMND/CCCD
  dob: Date; // Ngày sinh
  gender: string; // Giới tính
  salaryType: string; // Loại lương
  salaryDetails: {
    shiftRate: number;
    hourlyRate: number;
    dailyRate: number;
    fixedRate: number;
  }; // Chi tiết lương
  bonus: { type: string; form: string; value: number }[]; // Thưởng
  commission: number; // Hoa hồng
  commissionTable: string; // Mã bảng hoa hồng
  allowance: { name: string; type: string; value: number; valueType: string }[]; // Phụ cấp
  deduction: { name: string; type: string; condition: string; value: number }[]; // Khấu trừ
  status: string; // Trạng thái
}

// UpdateEmployeeDTO: Dùng để cập nhật
export class UpdateEmployeeDTO {
  name?: string; // Tên
  phone?: string; // Số điện thoại
  email?: string; // Email
  address?: string; // Địa chỉ
  branchSalary?: string; // Mã chi nhánh tính lương
  branchWork?: string; // Mã chi nhánh làm việc
  startDate?: Date; // Ngày bắt đầu
  position?: string; // Mã vị trí
  department?: string; // Mã phòng ban
  userAccount?: string; // Mã tài khoản
  idCard?: string; // CMND/CCCD
  dob?: Date; // Ngày sinh
  gender?: string; // Giới tính
  salaryType?: string; // Loại lương
  salaryDetails?: {
    shiftRate?: number;
    hourlyRate?: number;
    dailyRate?: number;
    fixedRate?: number;
  }; // Chi tiết lương
  bonus?: { type: string; form: string; value: number }[]; // Thưởng
  commission?: number; // Hoa hồng
  commissionTable?: string; // Mã bảng hoa hồng
  allowance?: { name: string; type: string; value: number; valueType: string }[]; // Phụ cấp
  deduction?: { name: string; type: string; condition: string; value: number }[]; // Khấu trừ
  status?: string; // Trạng thái
}