// ReturnDTO: Đại diện toàn bộ schema
export class ReturnDTO {
  returnId: string; // Mã trả hàng
  orderId: string; // Mã đơn hàng
  products: { productId: string; quantity: number }[]; // Sản phẩm trả
  totalAmount: number; // Tổng tiền trả
  status: string; // Trạng thái
  createdAt: Date; // Thời gian tạo
}

// CreateReturnDTO: Dùng để tạo mới
export class CreateReturnDTO {
  orderId: string; // Mã đơn hàng
  products: { productId: string; quantity: number }[]; // Sản phẩm trả
  totalAmount: number; // Tổng tiền trả
  status: string; // Trạng thái
}

// UpdateReturnDTO: Dùng để cập nhật
export class UpdateReturnDTO {
  products?: { productId: string; quantity: number }[]; // Sản phẩm trả
  totalAmount?: number; // Tổng tiền trả
  status?: string; // Trạng thái
}