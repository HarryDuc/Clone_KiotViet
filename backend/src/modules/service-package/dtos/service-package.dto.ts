// ServicePackageDTO: Đại diện toàn bộ schema
export class ServicePackageDTO {
  packageId: string; // Mã gói dịch vụ
  name: string; // Tên gói
  description: string; // Mô tả
  price: number; // Giá
  type: string; // Loại gói
  status: string; // Trạng thái
  createdAt: Date; // Thời gian tạo
}

// CreateServicePackageDTO: Dùng để tạo mới
export class CreateServicePackageDTO {
  name: string; // Tên gói
  description: string; // Mô tả
  price: number; // Giá
  type: string; // Loại gói
  status: string; // Trạng thái
}

// UpdateServicePackageDTO: Dùng để cập nhật
export class UpdateServicePackageDTO {
  name?: string; // Tên gói (tùy chọn)
  description?: string; // Mô tả (tùy chọn)
  price?: number; // Giá (tùy chọn)
  type?: string; // Loại gói (tùy chọn)
  status?: string; // Trạng thái (tùy chọn)
}