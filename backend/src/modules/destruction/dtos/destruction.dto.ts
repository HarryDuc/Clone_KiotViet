// DestructionDTO: Đại diện toàn bộ schema
export class DestructionDTO {
  destructionId: string; // Mã hủy hàng
  destructionCode: string; // Mã hiển thị
  products: { productId: string; quantity: number }[]; // Sản phẩm hủy
  totalValue: number; // Tổng giá trị
  status: string; // Trạng thái
}

// CreateDestructionDTO: Dùng để tạo mới
export class CreateDestructionDTO {
  destructionCode: string; // Mã hiển thị
  products: { productId: string; quantity: number }[]; // Sản phẩm hủy
  totalValue: number; // Tổng giá trị
  status: string; // Trạng thái
}

// UpdateDestructionDTO: Dùng để cập nhật
export class UpdateDestructionDTO {
  destructionCode?: string; // Mã hiển thị
  products?: { productId: string; quantity: number }[]; // Sản phẩm hủy
  totalValue?: number; // Tổng giá trị
  status?: string; // Trạng thái
}