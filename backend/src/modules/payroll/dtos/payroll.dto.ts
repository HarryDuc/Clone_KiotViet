// PayrollDTO: Đại diện toàn bộ schema
export class PayrollDTO {
  payrollId: string; // Mã bảng lương
  employeeId: string; // Mã nhân viên
  month: number; // Tháng
  year: number; // Năm
  basicSalary: number; // Lương cơ bản
  bonus: number; // Thưởng
  commission: number; // Hoa hồng
  allowance: number; // Phụ cấp
  deduction: number; // Khấu trừ
  total: number; // Tổng lương
  paid: number; // Đã trả
  status: string; // Trạng thái
  branch: string; // Mã chi nhánh
}

// CreatePayrollDTO: Dùng để tạo mới
export class CreatePayrollDTO {
  employeeId: string; // Mã nhân viên
  month: number; // Tháng
  year: number; // Năm
  basicSalary: number; // Lương cơ bản
  bonus: number; // Thưởng
  commission: number; // Hoa hồng
  allowance: number; // Phụ cấp
  deduction: number; // Khấu trừ
  total: number; // Tổng lương
  paid: number; // Đã trả
  status: string; // Trạng thái
  branch: string; // Mã chi nhánh
}

// UpdatePayrollDTO: Dùng để cập nhật
export class UpdatePayrollDTO {
  month?: number; // Tháng
  year?: number; // Năm
  basicSalary?: number; // Lương cơ bản
  bonus?: number; // Thưởng
  commission?: number; // Hoa hồng
  allowance?: number; // Phụ cấp
  deduction?: number; // Khấu trừ
  total?: number; // Tổng lương
  paid?: number; // Đã trả
  status?: string; // Trạng thái
  branch?: string; // Mã chi nhánh
}