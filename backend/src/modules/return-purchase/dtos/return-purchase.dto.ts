// ReturnPurchaseDTO: Đại diện toàn bộ schema
export class ReturnPurchaseDTO {
  returnPurchaseId: string; // Mã trả hàng
  purchaseOrderId: string; // Mã đơn đặt hàng
  products: { productId: string; quantity: number }[]; // Sản phẩm trả
  totalAmount: number; // Tổng tiền trả
  status: string; // Trạng thái
  createdAt: Date; // Thời gian tạo
}

// CreateReturnPurchaseDTO: Dùng để tạo mới
export class CreateReturnPurchaseDTO {
  purchaseOrderId: string; // Mã đơn đặt hàng
  products: { productId: string; quantity: number }[]; // Sản phẩm trả
  totalAmount: number; // Tổng tiền trả
  status: string; // Trạng thái
}

// UpdateReturnPurchaseDTO: Dùng để cập nhật
export class UpdateReturnPurchaseDTO {
  products?: { productId: string; quantity: number }[]; // Sản phẩm trả
  totalAmount?: number; // Tổng tiền trả
  status?: string; // Trạng thái
}