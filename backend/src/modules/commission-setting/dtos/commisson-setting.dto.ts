// CommissionSettingDTO: Đại diện toàn bộ schema
export class CommissionSettingDTO {
  commissionId: string; // Mã thiết lập
  name: string; // Tên thiết lập
  scope: string; // Phạm vi
  branchId: string; // Mã chi nhánh
  status: string; // Trạng thái
  details: { productId: string; rate: number }[]; // Chi tiết hoa hồng
  createdAt: Date; // Thời gian tạo
}

// CreateCommissionSettingDTO: Dùng để tạo mới
export class CreateCommissionSettingDTO {
  name: string; // Tên thiết lập
  scope: string; // Phạm vi
  branchId: string; // Mã chi nhánh
  status: string; // Trạng thái
  details: { productId: string; rate: number }[]; // Chi tiết hoa hồng
}

// UpdateCommissionSettingDTO: Dùng để cập nhật
export class UpdateCommissionSettingDTO {
  name?: string; // Tên thiết lập
  scope?: string; // Phạm vi
  branchId?: string; // Mã chi nhánh
  status?: string; // Trạng thái
  details?: { productId: string; rate: number }[]; // Chi tiết hoa hồng
}