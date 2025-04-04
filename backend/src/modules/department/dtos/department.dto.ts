// DepartmentDTO: Đại diện toàn bộ schema
export class DepartmentDTO {
  departmentId: string; // Mã phòng ban
  name: string; // Tên
  description: string; // Mô tả
  status: string; // Trạng thái
  createdAt: Date; // Thời gian tạo
}

// CreateDepartmentDTO: Dùng để tạo mới
export class CreateDepartmentDTO {
  name: string; // Tên
  description: string; // Mô tả
  status: string; // Trạng thái
}

// UpdateDepartmentDTO: Dùng để cập nhật
export class UpdateDepartmentDTO {
  name?: string; // Tên
  description?: string; // Mô tả
  status?: string; // Trạng thái
}