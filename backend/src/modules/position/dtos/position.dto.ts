// PositionDTO: Đại diện toàn bộ schema
export class PositionDTO {
  positionId: string; // Mã vị trí
  name: string; // Tên
  description: string; // Mô tả
  status: string; // Trạng thái
  createdAt: Date; // Thời gian tạo
}

// CreatePositionDTO: Dùng để tạo mới
export class CreatePositionDTO {
  name: string; // Tên
  description: string; // Mô tả
  status: string; // Trạng thái
}

// UpdatePositionDTO: Dùng để cập nhật
export class UpdatePositionDTO {
  name?: string; // Tên
  description?: string; // Mô tả
  status?: string; // Trạng thái
}