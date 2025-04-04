// PurchaseOrderDTO: Đại diện toàn bộ schema
export class PurchaseOrderDTO {
  purchaseOrderId: string; // Mã đơn đặt hàng
  supplierId: string; // Mã nhà cung cấp
  products: { productId: string; quantity: number; price: number }[]; // Sản phẩm
  totalAmount: number; // Tổng tiền
  status: string; // Trạng thái
  createdAt: Date; // Thời gian tạo
}

// CreatePurchaseOrderDTO: Dùng để tạo mới
export class CreatePurchaseOrderDTO {
  supplierId: string; // Mã nhà cung cấp
  products: { productId: string; quantity: number; price: number }[]; // Sản phẩm
  totalAmount: number; // Tổng tiền
  status: string; // Trạng thái
}

// UpdatePurchaseOrderDTO: Dùng để cập nhật
export class UpdatePurchaseOrderDTO {
  supplierId?: string; // Mã nhà cung cấp
  products?: { productId: string; quantity: number; price: number }[]; // Sản phẩm
  totalAmount?: number; // Tổng tiền
  status?: string; // Trạng thái
}